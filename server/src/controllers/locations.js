import { LOCATION_PATH, instagramFetch, convertPathParams, getGraphql, errorHandling} from "../utils/fetcher.js";
import { instagramFeedToFeedCollection } from "./posts.js";

const instagramLocationToLocationObject = (fetchData) => {
    return {
        id: fetchData.id,
        locationName: fetchData.name,
        lat: fetchData.lat,
        lng: fetchData.lng,
        addressJson: fetchData.address_json,
        locationImageUrl: fetchData.profile_pic_url,
        postCount: fetchData.edge_location_to_media.count,
    };
}

export const loadLocation = async (req, res) => {
    const {locationId, locationName} = req.params;

    const graphql = await instagramFetch.get(`/explore/locations/${locationId}/${locationName}/?__a=1`)
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.location) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = {
        ...instagramLocationToLocationObject(graphql.location),
        topMedia: instagramFeedToFeedCollection(graphql.location.edge_location_to_top_posts),
        timelineMedia: instagramFeedToFeedCollection(graphql.location.edge_location_to_media)
    };
    return res.status(200).json(convertedData);
}

export const loadLocationFeed = async (req, res) => {
    const {locationId, first, endCursor} = req.query;
    const graphql = await instagramFetch.get(LOCATION_PATH + convertPathParams({id: locationId, first: first, after: endCursor}))
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.location) {
        return res.status(200).json(graphql);
    }

    const convertedData = instagramFeedToFeedCollection(graphql.location.edge_location_to_media)
    return res.status(200).json(convertedData);
}
import { instagramFetch, getGraphql, errorHandling} from "../utils/fetcher.js";
import { instagramFeedToFeedCollection } from "./feed.js";

const instagramLocationToLocationObject = (instagramLocation) => {
    return {
        id: instagramLocation.id,
        locationName: instagramLocation.name,
        lat: instagramLocation.lat,
        lng: instagramLocation.lng,
        addressJson: instagramLocation.address_json,
        locationImageUrl: instagramLocation.profile_pic_url,
        postCount: instagramLocation.edge_location_to_media.count,
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
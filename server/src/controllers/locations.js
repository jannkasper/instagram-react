import { instagramFetch, getGraphql, errorHandling} from "../utils/fetcher.js";
import { locationToLocationDTO, feedCollectionToFeedCollectionDTO } from "../mappers/index.js";

export const loadLocation = async (req, res) => {
    const {locationId, locationName} = req.params;

    const graphql = await instagramFetch.get(`/explore/locations/${locationId}/${locationName}/?__a=1`)
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.location) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = {
        ...locationToLocationDTO(graphql.location),
        topMedia: feedCollectionToFeedCollectionDTO(graphql.location.edge_location_to_top_posts),
        timelineMedia: feedCollectionToFeedCollectionDTO(graphql.location.edge_location_to_media)
    };
    return res.status(200).json(convertedData);
}

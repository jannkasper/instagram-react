import { instaFetcher } from "../utils/fetcher.js";
import { errorHandler, graphqlHandler } from "../utils/handler.js";
import { locationToLocationDTO, feedCollectionToFeedCollectionDTO } from "../mappers/index.js";

export const loadLocation = async (req, res) => {
    const {locationId, locationName} = req.params;

    const graphql = await instaFetcher.get(`/explore/locations/${locationId}/${locationName}/?__a=1`)
        .then(graphqlHandler)
        .catch(errorHandler);

    if (graphql.error || !graphql.location) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = { topMedia: {}, timelineMedia: {} };
    Object.assign(responseData, locationToLocationDTO(graphql.location));
    Object.assign(responseData.topMedia, feedCollectionToFeedCollectionDTO(graphql.location.edge_location_to_top_posts));
    Object.assign(responseData.timelineMedia, feedCollectionToFeedCollectionDTO(graphql.location.edge_location_to_media));

    return res.status(200).json(responseData);
}

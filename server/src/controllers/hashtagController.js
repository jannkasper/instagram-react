import { instaFetcher } from "../utils/fetcher.js";
import { errorHandler, graphqlHandler } from "../utils/handler.js";
import { hashtagToHashtagDTO, feedCollectionToFeedCollectionDTO } from "../mappers/index.js";

export const loadHashtag = async (req, res) => {
    const tag = req.params.tag;

    const graphql = await instaFetcher.get(`/explore/tags/${tag}/?__a=1`)
        .then(graphqlHandler)
        .catch(errorHandler);

    if (graphql.error || !graphql.hashtag) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = { topMedia: {}, timelineMedia: {} };
    Object.assign(responseData, hashtagToHashtagDTO(graphql.hashtag));
    Object.assign(responseData.topMedia, feedCollectionToFeedCollectionDTO(graphql.hashtag.edge_hashtag_to_top_posts));
    Object.assign(responseData.timelineMedia, feedCollectionToFeedCollectionDTO(graphql.hashtag.edge_hashtag_to_media));

    return res.status(200).json(responseData);
}

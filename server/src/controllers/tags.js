import { instagramFetch, errorHandling, getGraphql } from "../utils/fetcher.js";
import { hashtagToHashtagDTO, feedCollectionToFeedCollectionDTO } from "../mappers/index.js";

export const loadTag = async (req, res) => {
    const tag = req.params.tag;

    const graphql = await instagramFetch.get(`/explore/tags/${tag}/?__a=1`)
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.hashtag) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = {
        ...hashtagToHashtagDTO(graphql.hashtag),
        topMedia: feedCollectionToFeedCollectionDTO(graphql.hashtag.edge_hashtag_to_top_posts),
        timelineMedia: feedCollectionToFeedCollectionDTO(graphql.hashtag.edge_hashtag_to_media),
    };

    return res.status(200).json(convertedData);
}

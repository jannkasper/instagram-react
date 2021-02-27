import { instagramFetch, errorHandling, getGraphql } from "../utils/fetcher.js";
import { instagramFeedToFeedCollection } from "./feed.js";

const instagramTagToTagObject = (instagramTag) => {
    return {
        id: instagramTag.id,
        tagName: instagramTag.name,
        tagImageUrl: instagramTag.profile_pic_url,
        postCount: instagramTag.edge_hashtag_to_media.count,
    };
}

export const loadTag = async (req, res) => {
    const tag = req.params.tag;

    const graphql = await instagramFetch.get(`/explore/tags/${tag}/?__a=1`)
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.hashtag) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = {
        ...instagramTagToTagObject(graphql.hashtag),
        topMedia: instagramFeedToFeedCollection(graphql.hashtag.edge_hashtag_to_top_posts),
        timelineMedia: instagramFeedToFeedCollection(graphql.hashtag.edge_hashtag_to_media),
    };

    return res.status(200).json(convertedData);
}
import {TAG_PATH, instagramFetch, convertPathParams, errorHandling, getGraphql} from "../utils/fetcher.js";
import { instagramFeedToFeedCollection } from "./posts.js";

const instagramTagToTagObject = (fetchData) => {
    return {
        id: fetchData.id,
        tagName: fetchData.name,
        tagImageUrl: fetchData.profile_pic_url,
        postCount: fetchData.edge_hashtag_to_media.count,
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

export const loadTagFeed = async (req, res) => {
    const {tagName, first, endCursor} = req.query;
    const graphql = await instagramFetch.get(TAG_PATH + convertPathParams({tag_name: tagName, first: first, after: endCursor}))
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.hashtag) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = instagramFeedToFeedCollection(graphql.hashtag.edge_hashtag_to_media)
    return res.status(200).json(convertedData);
}
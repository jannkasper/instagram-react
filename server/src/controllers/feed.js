import { convertPathParams, errorHandling, FEED_PATH, getGraphql, instagramFetch, LOCATION_PATH, TAG_PATH, TAGGED_PATH } from "../utils/fetcher.js";
import FormData from "form-data";

export const instagramFeedToFeedCollection = (instagramFeed) => {
    const feedCollection = [];

    for (let edge of instagramFeed.edges) {
        edge = edge.node;
        feedCollection.push({
            postId: edge.shortcode,
            likeCount: edge.edge_liked_by?.count || edge.edge_media_preview_like?.count,
            commentCount: edge.edge_media_to_comment?.count,
            isVideo: edge.is_video,
            isSidecar: edge.edge_sidecar_to_children && edge.edge_sidecar_to_children.edges.length > 0,
            thumbnailArray : edge.thumbnail_resources,
            thumbnailSrc:  edge.thumbnail_src,
        })
    }

    return {
        mediaArray: feedCollection,
        pageInfo: {
            hasNextPage: instagramFeed.page_info?.has_next_page,
            endCursor: instagramFeed.page_info?.end_cursor,
        }
    }
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

export const loadPostFeed = async (req, res) => {
    const { userId, first, endCursor} = req.query;
    const postId = req.params.postId;
    const graphql = await instagramFetch.get(FEED_PATH + convertPathParams({id: userId, first: first}))
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = instagramFeedToFeedCollection(graphql.user.edge_owner_to_timeline_media);
    convertedData.mediaArray = convertedData.mediaArray.filter(item => item.postId != postId).slice(0, 6);
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

export const loadUserFeed = async (req, res) => {
    const { userId, first, endCursor} = req.query;
    const graphql = await instagramFetch.get(FEED_PATH + convertPathParams({id: userId, first: first, after: endCursor}))
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = instagramFeedToFeedCollection(graphql.user.edge_owner_to_timeline_media)
    return res.status(200).json(convertedData);
}

export const loadUserTaggedFeed = async (req, res) => {
    const { userId, first, endCursor} = req.query;
    const graphql = await instagramFetch.get(TAGGED_PATH + convertPathParams({id: userId, first: first, after: endCursor}))
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = instagramFeedToFeedCollection(graphql.user.edge_user_to_photos_of_you)
    return res.status(200).json(convertedData);
}

export const loadUserReelsFeed = async (req, res) => {
    const { userId, first, endCursor} = req.query;
    const formData = new FormData();
    formData.append('target_user_id', userId);
    formData.append('page_size', 12);
    formData.append('max_id', '');

    const graphql = await instagramFetch.post('https://i.instagram.com/api/v1/clips/user/', formData, { headers: formData.getHeaders() })
        .then(function (response) {
            return response
        })
        .catch(errorHandling);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = instagramFeedToFeedCollection(graphql.user.edge_user_to_photos_of_you)
    return res.status(200).json(convertedData);
}
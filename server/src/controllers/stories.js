import {convertPathParams, errorHandling, getGraphql, instagramFetch, STORIES_PATH} from "../utils/fetcher.js";

export const instagramStoryToStoryCollection = (instagramStoryCollection) => {
    const storiesCollection = [];

    for (let edge of instagramStoryCollection.edges) {
        edge = edge.node;
        storiesCollection.push({
            id: edge.id,
            title: edge.title,
            thumbnailSrc:  edge.cover_media_cropped_thumbnail.url,
            owner: {
                id: edge.owner.id,
                username: edge.owner.username,
                userImageUrl: edge.owner.profile_pic_url,
                isVerified: edge.owner.is_verified,
            },
        })
    }
    return storiesCollection
}

export const loadUserStories = async (req, res) => {
    const { userId } = req.query;
    const graphql = await instagramFetch.get(STORIES_PATH + convertPathParams({user_id: userId, include_chaining: true, include_reel: true, include_suggested_users: false, include_logged_out_extras: false, include_highlight_reels: true, include_live_status: true }))
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = instagramStoryToStoryCollection(graphql.user.edge_highlight_reels)
    return res.status(200).json(convertedData);
}
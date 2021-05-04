import { convertPathParams, errorHandling, FEED_PATH, getGraphql, instagramFetch, LOCATION_PATH, TAG_PATH, TAGGED_PATH } from "../utils/fetcher.js";
import { feedCollectionToFeedCollectionDTO } from "../mappers/index.js";
import FormData from "form-data";

export const loadLocationFeed = async (req, res) => {
    const {locationId, first, endCursor} = req.query;
    const encodedParamsURL = convertPathParams({id: locationId, first: first, after: endCursor});

    const graphql = await instagramFetch.get(LOCATION_PATH + encodedParamsURL)
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.location) {
        return res.status(200).json(graphql);
    }

    const responseData = feedCollectionToFeedCollectionDTO(graphql.location.edge_location_to_media)
    return res.status(200).json(responseData);
}


export const loadPostFeed = async (req, res) => {
    const { userId, first, endCursor } = req.query;
    const postId = req.params.postId;
    const encodedParamsURL = convertPathParams({id: userId, first: first});

    const graphql = await instagramFetch.get(FEED_PATH + encodedParamsURL)
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = feedCollectionToFeedCollectionDTO(graphql.user.edge_owner_to_timeline_media);
    responseData.mediaArray = responseData.mediaArray.filter(item => item.postId != postId).slice(0, 6);
    return res.status(200).json(responseData);
}


export const loadTagFeed = async (req, res) => {
    const {tagName, first, endCursor} = req.query;
    const encodedParamsURL = convertPathParams({tag_name: tagName, first: first, after: endCursor});

    const graphql = await instagramFetch.get(TAG_PATH + encodedParamsURL)
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.hashtag) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = feedCollectionToFeedCollectionDTO(graphql.hashtag.edge_hashtag_to_media)
    return res.status(200).json(responseData);
}

export const loadUserFeed = async (req, res) => {
    const { userId, first, endCursor} = req.query;
    const encodedParamsURL = convertPathParams({id: userId, first: first, after: endCursor});

    const graphql = await instagramFetch.get(FEED_PATH + encodedParamsURL)
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = feedCollectionToFeedCollectionDTO(graphql.user.edge_owner_to_timeline_media)
    return res.status(200).json(responseData);
}

export const loadUserTaggedFeed = async (req, res) => {
    const { userId, first, endCursor} = req.query;
    const encodedParamsURL = convertPathParams({id: userId, first: first, after: endCursor});


    const graphql = await instagramFetch.get(TAGGED_PATH + encodedParamsURL)
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = feedCollectionToFeedCollectionDTO(graphql.user.edge_user_to_photos_of_you)
    return res.status(200).json(responseData);
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

    const responseData = feedCollectionToFeedCollectionDTO(graphql.user.edge_user_to_photos_of_you)
    return res.status(200).json(responseData);
}

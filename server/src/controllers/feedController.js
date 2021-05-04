import { FEED_PATH, instaFetcher, LOCATION_PATH, TAG_PATH, TAGGED_PATH } from "../utils/fetcher.js";
import { feedCollectionToFeedCollectionDTO } from "../mappers/index.js";
import { decodeParamObject } from "../utils/formatter.js";
import { errorHandler, graphqlHandler } from "../utils/handler.js";
import FormData from "form-data";

export const loadLocationFeed = async (req, res) => {
    const {locationId, first, endCursor} = req.query;
    const decodedParamsURL = decodeParamObject({id: locationId, first: first, after: endCursor});

    const graphql = await instaFetcher.get(LOCATION_PATH + decodedParamsURL)
        .then(graphqlHandler)
        .catch(errorHandler);

    if (graphql.error || !graphql.location) {
        return res.status(200).json(graphql);
    }

    const responseData = feedCollectionToFeedCollectionDTO(graphql.location.edge_location_to_media)
    return res.status(200).json(responseData);
}


export const loadPostFeed = async (req, res) => {
    const { userId, first, endCursor } = req.query;
    const postId = req.params.postId;
    const decodedParamsURL = decodeParamObject({id: userId, first: first});

    const graphql = await instaFetcher.get(FEED_PATH + decodedParamsURL)
        .then(graphqlHandler)
        .catch(errorHandler);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = feedCollectionToFeedCollectionDTO(graphql.user.edge_owner_to_timeline_media);
    responseData.mediaArray = responseData.mediaArray.filter(item => item.postId != postId).slice(0, 6);
    return res.status(200).json(responseData);
}


export const loadHashtagFeed = async (req, res) => {
    const {tagName, first, endCursor} = req.query;
    const decodedParamsURL = decodeParamObject({tag_name: tagName, first: first, after: endCursor});

    const graphql = await instaFetcher.get(TAG_PATH + decodedParamsURL)
        .then(graphqlHandler)
        .catch(errorHandler);

    if (graphql.error || !graphql.hashtag) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = feedCollectionToFeedCollectionDTO(graphql.hashtag.edge_hashtag_to_media)
    return res.status(200).json(responseData);
}

export const loadUserFeed = async (req, res) => {
    const { userId, first, endCursor} = req.query;
    const decodedParamsURL = decodeParamObject({id: userId, first: first, after: endCursor});

    const graphql = await instaFetcher.get(FEED_PATH + decodedParamsURL)
        .then(graphqlHandler)
        .catch(errorHandler);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = feedCollectionToFeedCollectionDTO(graphql.user.edge_owner_to_timeline_media)
    return res.status(200).json(responseData);
}

export const loadUserTaggedFeed = async (req, res) => {
    const { userId, first, endCursor} = req.query;
    const decodedParamsURL = decodeParamObject({id: userId, first: first, after: endCursor});


    const graphql = await instaFetcher.get(TAGGED_PATH + decodedParamsURL)
        .then(graphqlHandler)
        .catch(errorHandler);

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

    const graphql = await instaFetcher.post('https://i.instagram.com/api/v1/clips/user/', formData, { headers: formData.getHeaders() })
        .then(function (response) {
            return response
        })
        .catch(errorHandler);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = feedCollectionToFeedCollectionDTO(graphql.user.edge_user_to_photos_of_you)
    return res.status(200).json(responseData);
}

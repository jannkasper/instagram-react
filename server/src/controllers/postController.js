import { instaFetcher } from "../utils/fetcher.js";
import { errorHandler } from "../utils/handler.js";
import {
    commentCollectionToCommentCollectionDTO,
    postToPostDTO,
    sidecarCollectionToSidecarCollectionDTO,
    loggedToLoggedDTO,
    postCollectionToPostCollectionDTO
} from "../mappers/index.js";

export const loadPosts = async (req, res) => {
    const graphql = await instaFetcher.get()
        .then(response => response.data.match(/<script type="text\/javascript">window\.__additionalDataLoaded\('feed',(.*)\);<\/script>/))
        .then(response => response[1])
        .then(response => JSON.parse(response))
        .catch(errorHandler);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = loggedToLoggedDTO(graphql.user);
    responseData.postArray = postCollectionToPostCollectionDTO(graphql.user.edge_web_feed_timeline)

    return res.status(200).json(responseData);
}

export const loadPost = async (req, res) => {
    const postId = req.params.postId;

    const graphql = await instaFetcher.get(`/p/${postId}`)
        .then(response => response.data.match(/<script type="text\/javascript">window\.__additionalDataLoaded(.*)<\/script>/))
        .then(response => response[1])
        .then(response => response.match(/\{(.*)\}/)[0])
        .then(response =>  JSON.parse(response))
        .then(response => response.graphql)
        .catch(errorHandler);

    if (graphql.error || !graphql.shortcode_media) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = postToPostDTO(graphql.shortcode_media);
    responseData.commentsData = commentCollectionToCommentCollectionDTO(graphql.shortcode_media.edge_media_to_parent_comment);
    responseData.sidecarArray = sidecarCollectionToSidecarCollectionDTO(graphql.shortcode_media.edge_sidecar_to_children)

    return res.status(200).json(responseData);
}


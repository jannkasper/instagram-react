import { instagramFetch, errorHandling } from "../utils/fetcher.js";
import { commentCollectionToCommentCollectionDTO, postToPostDTO,
    sidecarCollectionToSidecarCollectionDTO, loggedToLoggedDTO} from "../mappers/index.js";

export const instagramPostsToPostCollection = (instagramPostCollection) => {
    const postCollection = [];

    for (let edge of instagramPostCollection.edges) {
        edge = edge.node;
        if (edge.__typename === 'GraphImage' || edge.__typename === 'GraphVideo' || edge.__typename === 'GraphSidecar') {
            postCollection.push({
                ...postToPostDTO(edge),
                commentsData: commentCollectionToCommentCollectionDTO(edge.edge_media_preview_comment),
                sidecarArray: edge.edge_sidecar_to_children ? sidecarCollectionToSidecarCollectionDTO(edge.edge_sidecar_to_children) : null,
            })
        }
    }
    return postCollection;
}

export const loadPosts = async (req, res) => {
    const graphql = await instagramFetch.get()
        .then(response => response.data.match(/<script type="text\/javascript">window\.__additionalDataLoaded\('feed',(.*)\);<\/script>/))
        .then(response => response[1])
        .then(response => JSON.parse(response))
        .catch(errorHandling);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = {
        ...loggedToLoggedDTO(graphql.user),
        postArray: instagramPostsToPostCollection(graphql.user.edge_web_feed_timeline)
    };
    return res.status(200).json(convertedData);
}

export const loadPost = async (req, res) => {
    const postId = req.params.postId;

    const graphql = await instagramFetch.get(`/p/${postId}`)
        .then(response => response.data.match(/<script type="text\/javascript">window\.__additionalDataLoaded(.*)<\/script>/))
        .then(response => response[1])
        .then(response => response.match(/\{(.*)\}/)[0])
        .then(response =>  JSON.parse(response))
        .then(response => response.graphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.shortcode_media) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = {
        ...postToPostDTO(graphql.shortcode_media),
        commentsData: commentCollectionToCommentCollectionDTO(graphql.shortcode_media.edge_media_to_parent_comment),
        sidecarArray: graphql.shortcode_media.edge_sidecar_to_children ? sidecarCollectionToSidecarCollectionDTO(graphql.shortcode_media.edge_sidecar_to_children) : null,
    }
    return res.status(200).json(convertedData);
}


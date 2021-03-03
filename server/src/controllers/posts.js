import { instagramFetch, errorHandling } from "../utils/fetcher.js";
import { instagramCommentsToCommentsCollection } from "./comments.js";

export const instagramPostToPostObject = (instagramPost) => {
    return {
        id: instagramPost.id,
        shortcode: instagramPost.shortcode,
        isVideo: instagramPost.is_video,
        isSidecar: Boolean(instagramPost.edge_sidecar_to_children),
        videoUrl: instagramPost.video_url,
        resourceArray: instagramPost.display_resources,
        createdAt: instagramPost.taken_at_timestamp,
        description: instagramPost.edge_media_to_caption?.edges?.map(el => el.node.text).shift(),
        location: instagramPost.location && {
            id: instagramPost.location.id,
            slug: instagramPost.location.slug,
            name: instagramPost.location.name
        },
        owner: {
            id: instagramPost.owner.id,
            username: instagramPost.owner.username,
            userImageUrl: instagramPost.owner.profile_pic_url,
            isVerified: instagramPost.owner.is_verified,
        },
        likes: {
            count: instagramPost.edge_media_preview_like.count,
            userArray: instagramPost.edge_media_preview_like.edges?.map(el => el.node)
        },
        viewerHasLiked: instagramPost.viewer_has_liked,
        viewerHasSaved: instagramPost.viewer_has_saved,

    };
}

export const instagramPostsToPostCollection = (instagramPostCollection) => {
    const postCollection = [];

    for (let edge of instagramPostCollection.edges) {
        edge = edge.node;
        if (edge.__typename === 'GraphImage' || edge.__typename === 'GraphVideo' || edge.__typename === 'GraphSidecar') {
            postCollection.push({
                ...instagramPostToPostObject(edge),
                commentsData: instagramCommentsToCommentsCollection(edge.edge_media_preview_comment),
                sidecarArray: edge.edge_sidecar_to_children ? instagramSidecarToSidecarCollection(edge.edge_sidecar_to_children) : null,
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
        ...instagramLoggedToLoggedObject(graphql.user),
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
        ...instagramPostToPostObject(graphql.shortcode_media),
        commentsData: instagramCommentsToCommentsCollection(graphql.shortcode_media.edge_media_to_parent_comment),
        sidecarArray: graphql.shortcode_media.edge_sidecar_to_children ? instagramSidecarToSidecarCollection(graphql.shortcode_media.edge_sidecar_to_children) : null,
    }
    return res.status(200).json(convertedData);
}

const instagramSidecarToSidecarCollection = (instagramSidecarCollection) => {
    const sidecarCollection = [];

    for (let edge of instagramSidecarCollection.edges) {
        edge = edge.node;
        sidecarCollection.push({
            id: edge.id,
            shortcode: edge.shortcode,
            isVideo: edge.is_video,
            resourceArray: edge.display_resources,
        });
    }

    return sidecarCollection
}

const instagramLoggedToLoggedObject = (instagramLogged) => {
    return {
        id: instagramLogged.id,
        username: instagramLogged.username,
        userImageUrl: instagramLogged.profile_pic_url,
    };
}


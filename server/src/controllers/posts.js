import {
    instagramFetch,
    FEED_PATH,
    COMMENT_PATH,
    convertPathParams,
    getGraphql,
    errorHandling
} from "../utils/fetcher.js";


export const postContent = async (req, res) => {
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
        ...transformPostData(graphql.shortcode_media),
        commentsData: transformComments(graphql.shortcode_media.edge_media_to_parent_comment),
        sidecarArray: graphql.shortcode_media.edge_sidecar_to_children ? transformMediaCollection(graphql.shortcode_media.edge_sidecar_to_children) : null,
    }
    return res.status(200).json(convertedData);
}

export const morePostsContent = async (req, res) => {
    const { userId, first, endCursor} = req.query;
    const postId = req.params.postId;
    const graphql = await instagramFetch.get(FEED_PATH + convertPathParams({id: userId, first: first}))
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = transformMediaData(graphql.user.edge_owner_to_timeline_media);
    convertedData.mediaArray = convertedData.mediaArray.filter(item => item.postId != postId).slice(0, 6);
    return res.status(200).json(convertedData);
}

export const postMoreComments = async (req, res) => {
    let { shortcode, first, endCursor} = req.query;
    endCursor = endCursor.replace(/"/g, '\\"').replace(/ /g, "+")
    const params = `{"shortcode":"${shortcode}","first":${first},"after":"${endCursor}"}`

    const graphql = await instagramFetch.get(COMMENT_PATH + convertPathParams({shortcode: shortcode, first: first, after: endCursor}))
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.shortcode_media) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = transformComments(graphql.shortcode_media.edge_media_to_parent_comment)
    return res.status(200).json(convertedData);
}

const transformPostData = (fetchData) => {

    const postData = {
        id: fetchData.id,
        shortcode: fetchData.shortcode,
        isVideo: fetchData.is_video,
        isSidecar: Boolean(fetchData.edge_sidecar_to_children),
        videoUrl: fetchData.video_url,
        resourceArray: fetchData.display_resources,
        createdAt: fetchData.taken_at_timestamp,
        description: fetchData.edge_media_to_caption.edges?.map(el => el.node.text).shift(),
        location: fetchData.location?.name,
        owner: {
            id: fetchData.owner.id,
            username: fetchData.owner.username,
            userImageUrl: fetchData.owner.profile_pic_url,
            isVerified: fetchData.owner.is_verified,
        },
        likes: {
            count: fetchData.edge_media_preview_like.count,
            userArray: fetchData.edge_media_preview_like.edges?.map(el => el.node)
        },
        viewerHasLiked: fetchData.viewer_has_liked,
        viewerHasSaved: fetchData.viewer_has_saved,

    };

    return postData;
}

const transformComments = (fetchData) => {
    const commentsArray = { count: fetchData.count, commentsArray: []};

    if (fetchData.page_info) {
        commentsArray.pageInfo = { hasNextPage:  fetchData.page_info.has_next_page, endCursor: fetchData.page_info.end_cursor };
    }

    for (let edge of fetchData.edges) {
        edge = edge.node;

        const comment = {
            id: edge.id,
            createdAt: edge.created_at,
            likes: edge.edge_liked_by.count,
            owner: {
                id: edge.owner.id,
                username: edge.owner.username,
                userImageUrl: edge.owner.profile_pic_url,
                isVerified: edge.owner.is_verified,
            },
            text: edge.text,
            viewerHasLiked: edge.viewer_has_liked,
        }

        commentsArray.commentsArray.push(comment);
    }

    return commentsArray;
}

const transformMediaCollection = (fetchData) => {
    const mediaArray = [];

    for (let edge of fetchData.edges) {
        edge = edge.node;

        const media = {
            id: edge.id,
            shortcode: edge.shortcode,
            isVideo: edge.is_video,
            resourceArray: edge.display_resources,

        }

        mediaArray.push(media);
    }

    return mediaArray
}

export const transformMediaData = (fetchData) => {

    const mediaArray = [];

    for (let edge of fetchData.edges) {
        edge = edge.node;

        const mediaData = {
            postId: edge.shortcode,
            likeCount: edge.edge_liked_by?.count || edge.edge_media_preview_like?.count,
            commentCount: edge.edge_media_to_comment?.count,
            isVideo: edge.is_video,
            isSidecar: edge.edge_sidecar_to_children && edge.edge_sidecar_to_children.edges.length > 0,
            thumbnailArray : edge.thumbnail_resources
        }

        mediaArray.push(mediaData)
    }

    return {
        mediaArray: mediaArray,
        pageInfo: {
            hasNextPage: fetchData.page_info?.has_next_page,
            endCursor: fetchData.page_info?.end_cursor,
        }
    }

}
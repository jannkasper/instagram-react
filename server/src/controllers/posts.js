import {instagramFetch, convertPathParams, FEED_PATH, COMMENT_PATH} from "../utils/fetcher.js";


export const postContent = async (req, res) => {
    const postId = req.params.postId;

    const sharedData = await instagramFetch.get(`/p/${postId}`)
        .then(function (response) {
            // handle success
            // const jsonObject = response.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1)
            // const userInfo = JSON.parse(jsonObject)
            let jsonObject2 = response.data.match(/<script type="text\/javascript">window\.__additionalDataLoaded(.*)<\/script>/);

            if (jsonObject2) {
                jsonObject2 = jsonObject2[1]
                const jsonObject3 = jsonObject2.match(/\{(.*)\}/)[0];
                const userInfo2 = JSON.parse(jsonObject3)

                return userInfo2.graphql.shortcode_media
            }
            console.log(jsonObject2);
            return null;
        })

    if (sharedData == null) {
        return res.status(200).json({hasError: true });
    }

    // sharedData = sharedData[`/p/${postId}/`].data.graphql.shortcode_media;
    const cleanData = transformPostData(sharedData);
    //
    return res.status(200).json(cleanData);

}

export const morePostsContent = async (req, res) => {
    const { userId, first, endCursor} = req.query;
    const postId = req.params.postId;

    console.log("START FETCH POSTS")

    const params = `{"id":"${userId}","first":${first}}`
    const data = await instagramFetch.get(FEED_PATH + convertPathParams(params))
        .then(function (response) {
            // handle success
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    console.log("FINISH FETCH POSTS")
    if (data?.data?.user?.edge_owner_to_timeline_media) {
        console.log("TRANSFORM POSTS")
        const result = transformMediaData(data.data.user.edge_owner_to_timeline_media);
        result.mediaArray = result.mediaArray.filter(el => el.postId != postId).slice(0, 6);
        return res.status(200).json(result);
    }
    console.log("EMPTY POSTS")
    return res.status(200).json();
}

export const postMoreComments = async (req, res) => {
    let { shortcode, first, endCursor} = req.query;
    endCursor = endCursor.replace(/"/g, '\\"').replace(/ /g, "+")
    const params = `{"shortcode":"${shortcode}","first":${first},"after":"${endCursor}"}`

    const data = await instagramFetch.get(COMMENT_PATH + convertPathParams(params))
        .then(function (response) {
            // handle success
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    if (data?.data?.shortcode_media?.edge_media_to_parent_comment) {
        console.log("TRANSFORM COMMENTS")
        const response = transformComments(data.data.shortcode_media.edge_media_to_parent_comment)
        return res.status(200).json(response);
    }
    console.log("EMPTY POSTS")
    return res.status(200).json();
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

    postData.commentsData = transformComments(fetchData.edge_media_to_parent_comment);

    if (fetchData.edge_sidecar_to_children) {
        postData.sidecarArray = transformMediaCollection(fetchData.edge_sidecar_to_children);
    }

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
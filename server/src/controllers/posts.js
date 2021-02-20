import {getPage, startBrowser} from "../utils/session.js";
import axios from "axios";

export const postContent = async (req, res) => {
    const postId = req.params.postId;
    // const page = getPage();
    // const {page} = await startBrowser();

    console.log("4\tEnter selected post");
    // await page.goto(`https://www.instagram.com/p/${postId}`);
    // await page.goto(`https://www.instagram.com/p/${postId}`, { waitUntil: 'networkidle0' });
    //
    // let sharedData = await page.evaluate(() => {
    //     return window.__additionalData
    // });
    //
    // let sharedData = await page.evaluate(() => {
    //     return window.__additionalData
    // });

    const sharedData = await axios.get(`https://www.instagram.com/p/${postId}`)
        .then(function (response) {
            // handle success
            const jsonObject = response.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1)
            const userInfo = JSON.parse(jsonObject)
            return userInfo.entry_data.PostPage[0].graphql.shortcode_media
        })

    // sharedData = sharedData[`/p/${postId}/`].data.graphql.shortcode_media;
    const cleanData = transformPostData(sharedData);
    //
    return res.status(200).json(cleanData);

}

const transformPostData = (fetchData) => {

    const postData = {
        id: fetchData.id,
        shortcode: fetchData.shortcode,
        isVideo: fetchData.is_video,
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
        postData.mediaCollection = transformMediaCollection(fetchData.edge_sidecar_to_children);
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

const API_URL = 'https://instagram.com/graphql/query/';

export const morePostsContent = async (req, res) => {
    const { userId, first, endCursor} = req.query;
    const postId = req.params.postId;

    console.log("START FETCH POSTS")
    // const config = {
    //     params: {
    //         query_id: '17888483320059182',
    //         id: userId,
    //         first: first,
    //         after: endCursor
    //     }
    // };

    const {page} = await startBrowser();

    console.log("*\tOpen user in browser\t*")
    console.log(`https://instagram.com/graphql/query/?query_id=17888483320059182&id=${userId}&first=${first}`)
    // const config = {
    //     params: {
    //         query_id: '17888483320059182',
    //         id: userId,
    //         first: first,
    //         after: endCursor
    //     },
    //     withCredentials: true,
    //     headers: {
    //         'X-CSRF-TOKEN': "345Kulb8w9jSD0yhKdJ8brA17sVR8qnY",
    //         'csrf-token': "345Kulb8w9jSD0yhKdJ8brA17sVR8qnY",
    //         'csrftoken': '345Kulb8w9jSD0yhKdJ8brA17sVR8qnY',
    //         Cookie: {
    //             'X-CSRF-TOKEN': "345Kulb8w9jSD0yhKdJ8brA17sVR8qnY",
    //             'csrf-token': "345Kulb8w9jSD0yhKdJ8brA17sVR8qnY",
    //             'csrftoken': '345Kulb8w9jSD0yhKdJ8brA17sVR8qnY'
    //         }
    //     }
    // };
    const url = 'https://www.instagram.com/graphql/query/?query_hash=003056d32c2554def87228bc3fd9668a&variables=';
    const params = `{"id":"${userId}","first":${first}}`
    const transformParams = params.replace(',', '%2C')
        .replace('{', '%7B')
        .replace('}', '%7D')
        .replace(':', '%3A')
        .replace('"', '%22')
        .replace('=', '%3D');
    const data = await axios.get(url + transformParams)
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

// https://instagram.com/graphql/query/?query_id=17888483320059182&id=489992346&first=12

export const transformMediaData = (fetchData) => {

    const mediaArray = [];

    for (let edge of fetchData.edges) {
        edge = edge.node;

        const mediaData = {
            postId: edge.shortcode,
            likeCount: edge.edge_liked_by?.count || edge.edge_media_preview_like?.count,
            commentCount: edge.edge_media_to_comment?.count,
            isVideo: edge.is_video,
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
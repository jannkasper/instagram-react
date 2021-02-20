import {getPage, startBrowser} from "../utils/session.js";
import axios from "axios";

const config = {
    headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'pl,en-US;q=0.9,en;q=0.8,nl;q=0.7,nb;q=0.6',
        'cache-control': 'max-age=0',
        'cookie': 'ig_cb=2; ig_did=88BB498E-E955-405F-A830-3DB7BC47A8AE; mid=X-DhrwAEAAFWBn9a9lE9zRScjQRf; fbm_124024574287414=base_domain=.instagram.com; shbid=19194; datr=Ay8iYAsdTFJuw4kRnu92mOox; rur=FRC; ig_lang=en; shbts=1613798901.7801588; csrftoken=d92e9gEoTAAd51SQgc9aDhCVlbjejhSj; ds_user_id=46117109912; sessionid=46117109912%3A95zw2n93DlciMM%3A24; fbsr_124024574287414=Dx_A-siy7jpyscYUgmnilgfZyxkfVb14vrATpFOjAO0.eyJ1c2VyX2lkIjoiMTAwMDAxMTMyMjcxMzU5IiwiY29kZSI6IkFRQUhmR291Q2ZYMWh5dWFIYXNsYXhScDFaOHkyV2M5UXhTRmZjZTNITS03VFJPWEhWUzdmTXVuUzRtWGJEZzRUVWhCaENBdk9YM3VFVWpTYW1jNE43WGJ6UkJLWTdwZHk1NnZfMWdmUlpyUmVRZjlmRzM2QnQ5ZkhsS1gtM3drNTJTWnlyeUZzUFc5c3B2RlJ4NjAzdWEwdWhCQjQzb3pLRWFkVlFLSktBelJkT3JqN0lPeGstVHU1LTlYT3FPRFFiTUZQdnZ4QjM5QXRtMWlCblVfcHVVMDZKZldvSmRzdmVFWmFfNzlRMlZzZFE5N2ZKUDJwVklXeTltRlk0N1B4S3c5cWcwNzNwOTMxb2pFSFJlNksxUC01Z3pPdlpXZTdHNWExT0Z5elVwc2NZd3RoM2dnVXFCa2dHTzhDaTA1cjZUSEVKcHdMTUY1aVY4QVVXV0dtUUZ2Iiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQURwNEJib0xHNFJ2OTFIY1ZWZWIyb1JGWkFMOFJ5eThmZ3ZjcFZiQnBkdFdpSWRMWUtmVTR5SFZLNEhPb3puZGl4WThhN09udVNITzlHUW5tTW5HSW5LdkFaQUc4WkMzNHU2R3hMblYzY0p2aGROV2JPUm1nelpDa1hGM2VTYkpwcjhDQ2pzRk1rb1g0WkFhZEhJbUlqWFFBN1BmcFFnUjE0eU1Wd0k5SSIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjEzODE4NjY4fQ',
        'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    }
}

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

    const sharedData = await axios.get(`https://www.instagram.com/p/${postId}`, config)
        .then(function (response) {
            // handle success
            const jsonObject = response.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1)
            const userInfo = JSON.parse(jsonObject)

            const jsonObject2 = response.data.match(/<script type="text\/javascript">window\.__additionalDataLoaded(.*)<\/script>/)[1];
            const jsonObject3 = jsonObject2.match(/\{(.*)\}/)[0];
            const userInfo2 = JSON.parse(jsonObject3)

            return userInfo2.graphql.shortcode_media
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
    const data = await axios.get(url + transformParams, config)
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
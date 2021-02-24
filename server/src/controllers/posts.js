import {getPage, startBrowser} from "../utils/session.js";
import axios from "axios";

const config = {
    headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'pl,en-US;q=0.9,en;q=0.8,nl;q=0.7,nb;q=0.6',
        'cache-control': 'max-age=0',
        'cookie': 'ig_cb=2; ig_did=88BB498E-E955-405F-A830-3DB7BC47A8AE; mid=X-DhrwAEAAFWBn9a9lE9zRScjQRf; fbm_124024574287414=base_domain=.instagram.com; shbid=19194; datr=Ay8iYAsdTFJuw4kRnu92mOox; shbts=1613798901.7801588; rur=FRC; ig_lang=en; csrftoken=9gEpsDgAROJLNkg2wXSA6SBHuSg65vh3; ds_user_id=46117109912; sessionid=46117109912%3APyjQy074GtUNKP%3A16; fbsr_124024574287414=MMuAHLzlpG2NEwV10fNy8UstuBJwEugDzU8olG_-h_c.eyJ1c2VyX2lkIjoiMTAwMDAxMTMyMjcxMzU5IiwiY29kZSI6IkFRREZsRTZKS1FnRmtMQldESFpCME82Vk5wQ2xVUmRqMThEUjk4dE4yMGJPLXo1NV9wNjB3cmhhUVNsbWlyakdHNXF4UTV4d1FFNTN0Z1NHeW9VTkd4VUwzOWU5N1ZVTVdsQ0R1VGdBNEQyMWJiMlU2TFJ4RHFjSm5nOE83cmRQa0lwc0U2d0FMaUFlWVV0WkxfU2V0THVZV25tcWRIc2JaVUZKcFJldDR0blVNWE1zQWdNc2lwN1NBSkhleWt4cDBnRTY3bVVzcFdXLXFCRE1uMFJFbmVYQ3ZUYTJWajFqTmtqSFBZbEhicXpVcHgwbGpicWxYOVBVWjJkVFRZVTA0WGpjaTh1Qjl6QUNVbko1cUxRYWVPV1doQjRHNV9KdlVsb0hzU1hHdGkyTk02eUV5QjAxU2tOS3R2RGRPWjBmY25mcjU3M054d2dSb1VQMjE4TnZ5TVlUIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUtkNDFaQ2tvRlRaQVQ3WFUzV2FXMlpCY1pBV2VybXllYXVLWWlFaDIyTm4wSkNmZFl4Um9WYjFFc0xUdjBvZFZMdnJFR3BEbWFaQzJDUDc0T05uRm1vazZSR05HT2d1MHFTcWJMb3VMWVB5cjVUS1J1QXR3M3YyVEMxT25EUFJoZlBvdUFHaWV4b01HT1djZUs3YVBDczM3N0VlZklibktiRkkwQnhOVSIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjE0MDY0MzM3fQ',
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

const API_URL = 'https://instagram.com/graphql/query/';

export const morePostsContent = async (req, res) => {
    const { userId, first, endCursor} = req.query;
    const postId = req.params.postId;

    console.log("START FETCH POSTS")

    const url = 'https://www.instagram.com/graphql/query/?query_hash=003056d32c2554def87228bc3fd9668a&variables=';
    const params = `{"id":"${userId}","first":${first}}`
    const transformParams = params.replaceAll(',', '%2C')
        .replaceAll('{', '%7B')
        .replaceAll('}', '%7D')
        .replaceAll(':', '%3A')
        .replaceAll('"', '%22')
        .replaceAll('=', '%3D');
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

export const postMoreComments = async (req, res) => {
    let { shortcode, first, endCursor} = req.query;

    const url = 'https://www.instagram.com/graphql/query/?query_hash=bc3296d1ce80a24b1b6e40b1e72903f5&variables=';
    endCursor = endCursor.replaceAll('"', '\\"').replaceAll(" ", "+")
    const params = `{"shortcode":"${shortcode}","first":${first},"after":"${endCursor}"}`
    const transformParams = params.replaceAll(',', '%2C')
        .replaceAll('{', '%7B')
        .replaceAll('}', '%7D')
        .replaceAll(':', '%3A')
        .replaceAll('"', '%22')
        .replaceAll('=', '%3D')
        .replaceAll('\\', '%5C');
    const data = await axios.get(url + transformParams, config)
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
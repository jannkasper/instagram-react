import {convertPathParams, instagramFetch, TAG_PATH} from "../utils/fetcher.js";
import { transformMediaData } from "./posts.js";

export const tagContent = async (req, res) => {
    const tag = req.params.tag;

    const path = `/explore/tags/${tag}/?__a=1`;

    const data = await instagramFetch.get(path)
        .then(function (response) {
            // handle success
            if (response.data.graphql?.hashtag) {
                return response.data.graphql.hashtag;
            }
            return  null
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })


    if (data == null) {
        return res.status(200).json({hasError: true, message: 'Tag not exists!'});
    }

    const cleanData = convertTagData(data);

    cleanData.topMedia = transformMediaData(data.edge_hashtag_to_top_posts);
    cleanData.timelineMedia = transformMediaData(data.edge_hashtag_to_media);

    return res.status(200).json(cleanData);
}

const convertTagData = (fetchData) => {

    const tagData = {

        id: fetchData.id,
        tagName: fetchData.name,
        tagImageUrl: fetchData.profile_pic_url,
        postCount: fetchData.edge_hashtag_to_media.count,
    };

    return tagData;
}

export const nextPageTagContent = async (req, res) => {
    const {tagName, first, endCursor} = req.query;
    const params = `{"tag_name":"${tagName}","first":${first},"after":"${endCursor}"}`
    const data = await instagramFetch.get(TAG_PATH + convertPathParams(params))
        .then(function (response) {
            // handle success
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    console.log(data)
    console.log("FINISH FETCH POSTS")
    if (data?.data?.hashtag?.edge_hashtag_to_media) {
        console.log("TRANSFORM POSTS")
        const result = transformMediaData(data.data.hashtag.edge_hashtag_to_media);
        return res.status(200).json(result);
    }
    console.log("EMPTY POSTS")
    return res.status(200).json();


}
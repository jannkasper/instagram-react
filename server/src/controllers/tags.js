import axios from "axios";
import { transformMediaData } from "./posts.js";

const config = {
    headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'pl,en-US;q=0.9,en;q=0.8,nl;q=0.7,nb;q=0.6',
        'cache-control': 'max-age=0',
        'cookie': 'ig_cb=2; ig_did=88BB498E-E955-405F-A830-3DB7BC47A8AE; mid=X-DhrwAEAAFWBn9a9lE9zRScjQRf; fbm_124024574287414=base_domain=.instagram.com; shbid=19194; datr=Ay8iYAsdTFJuw4kRnu92mOox; shbts=1613798901.7801588; rur=FRC; ig_lang=en; csrftoken=9gEpsDgAROJLNkg2wXSA6SBHuSg65vh3; ds_user_id=46117109912; sessionid=46117109912%3APyjQy074GtUNKP%3A16; fbsr_124024574287414=faidg1eK8ALtvpSirNS6vpF9WhbRkL851TPIqyzXu_k.eyJ1c2VyX2lkIjoiMTAwMDAxMTMyMjcxMzU5IiwiY29kZSI6IkFRQm5XcFBBRENVSy15bFBlU0RzeTM4Q3FJWTdtRFN1LVEzWEJUckdUODRZc2FnbDYyV2lMQzA0Q1B3NlRZeVRybkhpTVhXeC1FRmFKWmtJZkw4VVQxdkk5cS1Jdm85YmNYMnV1b3M0RVNsNkFPR0RuVFRoaGdQVkxjaFF4N1NCcWd2WU5tZ3VJUC12Z0NVNjJmNTNERFNURVNOS2ZHY3o3ZE1mX2NacWJmTUFRZEFiVy1kLTVncXlERnV5S1pDQXU4UFpyT2gtcm9VaWNIVjBTNXpNd190MG5VNWthVDhVREc4MWxzVWJJeHkxa2xwTU45VHRpQ3RzZTQ1RS1lOGRKdzh2MlA5d2lDRm5LTF9BWmZhLThfLXJuc3BKUUVHYVMwYmtqMTl0TVFkY1dFTndEUTdaTmxTTktFeHlaY21zZDQ2eXhCTk13UGh5aW1CRDlVbjk4dWliIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUNHdnZWVHlMT1FvTHh6d2ZQTzM5N0JUYUV5UmlHRkM1Rzc0N2VxVWJaQm9lb2U5MUFYOHVKdklQMVB2a3VHeHhuY01QeVZhTmRjZVlrc3g0eEhmN2NJbkRzOFJ1bDZQTmJOaUpkYUJWYXJaQXMxOGpObDhPRk9wRFhYbVBnckF4ZmF1Q1JnZXZiVXJoVnBaQlZqSWExU2NJcjZORFpDenBOeG1oWDd6IiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MTQxNTQzMTl9',
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

export const tagContent = async (req, res) => {
    const tag = req.params.tag;

    const url = `https://www.instagram.com/explore/tags/${tag}/?__a=1`;

    const data = await axios.get(url, config)
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


    const url = 'https://www.instagram.com/graphql/query/?query_hash=9b498c08113f1e09617a1703c22b2f32&variables=';
    const params = `{"tag_name":"${tagName}","first":${first},"after":"${endCursor}"}`
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
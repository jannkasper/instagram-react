import axios from "axios";
import { transformMediaData } from "./posts.js";

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

export const locationContent = async (req, res) => {
    const {locationId, locationName} = req.params;

    const url = `https://www.instagram.com/explore/locations/${locationId}/${locationName}/?__a=1`;

    const data = await axios.get(url, config)
        .then(function (response) {
            // handle success
            if (response.data.graphql?.location) {
                return response.data.graphql.location;
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

    const cleanData = convertLocationData(data);

    cleanData.topMedia = transformMediaData(data.edge_location_to_top_posts);
    cleanData.timelineMedia = transformMediaData(data.edge_location_to_media);

    return res.status(200).json(cleanData);
}

const convertLocationData = (fetchData) => {

    const locationData = {

        id: fetchData.id,
        locationName: fetchData.name,
        lat: fetchData.lat,
        lng: fetchData.lng,
        addressJson: fetchData.address_json,
        locationImageUrl: fetchData.profile_pic_url,
        postCount: fetchData.edge_location_to_media.count,
    };

    return locationData;
}

export const nextPageLocationContent = async (req, res) => {
    const {locationId, first, endCursor} = req.query;


    const url = 'https://www.instagram.com/graphql/query/?query_hash=36bd0f2bf5911908de389b8ceaa3be6d&variables=';
    const params = `{"id":"${locationId}","first":${first},"after":"${endCursor}"}`
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
    if (data?.data?.location?.edge_location_to_media) {
        console.log("TRANSFORM POSTS")
        const result = transformMediaData(data.data.location.edge_location_to_media);
        return res.status(200).json(result);
    }
    console.log("EMPTY POSTS")
    return res.status(200).json();


}
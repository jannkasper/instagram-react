import axios from "axios";
import { transformMediaData } from "./posts.js";

const config = {
    headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'pl,en-US;q=0.9,en;q=0.8,nl;q=0.7,nb;q=0.6',
        'cache-control': 'max-age=0',
        'cookie': 'ig_cb=2; ig_did=88BB498E-E955-405F-A830-3DB7BC47A8AE; mid=X-DhrwAEAAFWBn9a9lE9zRScjQRf; fbm_124024574287414=base_domain=.instagram.com; shbid=19194; datr=Ay8iYAsdTFJuw4kRnu92mOox; rur=FRC; ig_lang=en; shbts=1613798901.7801588; csrftoken=d92e9gEoTAAd51SQgc9aDhCVlbjejhSj; ds_user_id=46117109912; sessionid=46117109912%3A95zw2n93DlciMM%3A24; fbsr_124024574287414=0OM30TxxCkFdYjkzdIylxm4TngL99upt18tk2z-4gpo.eyJ1c2VyX2lkIjoiMTAwMDAxMTMyMjcxMzU5IiwiY29kZSI6IkFRQlR2dWdaNDFTZnNPSEJFOTlqM2lzbjNmZFV3LThOWVhMXzBkM1cwT09PSlpubVNoYnMyaXhHMjNzZVctaVd0UUFDRnJRcTIzSHNrcjZrZHl3VWdSNG9oalFKRVU1NHpqTlFidnYyNUNWYW1hajZhaXZ5Q2pHV0xNOFMzaHpIZjZwbk9mMXY1U1g3ZXRnM05fUTU1MkZqdWt1SDNyRGM1aEtDUThIQWE4OHlsZklIOXhxUUFzdGtUOEVZRVdHTnNJQ3UtelRRWDdqQmw0Uk5HVEJWMmpObnpwNDh1TkRrWEc5U0wyM09qb0dVVmk3bDJhN1VNdHJyYURKc1VucDdQUC1zekNnVlF4VzlfT0l2TkRhLWNaQVJpRU9zVUc1ODhQQWdGdEFYektpdWtyZTlVd2pWT1N6cDg2T2ZBU2lXdUw1QlhwSlNBOHA3cHR4WHNsUkYyTlpuIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUJLMWRpazFsN1JvUUhwWkFGRGkwQUhETmx3YVZaQWNaQmM4NzJ5Z3Z4RTlaQVhNc2FvenVFNXhiYlZtemRPQ1AxbWRhV0E2anVuMjJCTVVKWkNYWFZxTUVxZTdVZWVmYjVmcmpIMnNaQ0k3cTRUbk5iRlNDUlpCOXpJcFJuWTBFcThCenZseE5jOEx2b2JvNFBtMW5vQ3pXdExXVDE0cmhNT0FTczROQTJmIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MTM4ODg4NzF9',
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
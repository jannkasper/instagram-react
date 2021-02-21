import axios from "axios";

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

export const searchContent = async (req, res) => {
    const query = req.params.query;

    const url = `https://www.instagram.com/web/search/topsearch/?context=blended&query=${query}&rank_token=0.9681968460805339&include_reel=true`;
    // const params = `{"id":"${userId}","first":${first},"after":"${endCursor}"}`
    // const transformParams = params.replace(',', '%2C')
    //     .replace('{', '%7B')
    //     .replace('}', '%7D')
    //     .replace(':', '%3A')
    //     .replace('"', '%22')
    //     .replace('=', '%3D');
    const data = await axios.get(url, config)
        .then(function (response) {
            // handle success
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    const result = [];
    data.users.forEach(item => result.push({user: true, position: item.position, username:item.user.username, name: item.user.username, description: item.user.full_name, imageUrl: item.user.profile_pic_url, isVerified: item.user.is_verified }));
    data.places.forEach(item => result.push({place: true, position: item.position, id: item.place.location.pk, slug: item.place.slug, name: item.place.title, description: item.place.subtitle }))
    data.hashtags.forEach(item => result.push({hashtag: true, position: item.position,  name: item.hashtag.name, postCount: item.hashtag.media_count, imageUrl: item.hashtag.profile_pic_url}))

    result.sort((a,b) => a.position - b.position);
    return res.status(200).json(result);
}
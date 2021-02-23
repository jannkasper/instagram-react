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
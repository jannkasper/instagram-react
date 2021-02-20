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

export const searchContent = async (req, res) => {
    const query = req.params.query;

    const url = `https://www.instagram.com/web/search/topsearch/?context=blended&query=${query}&rank_token=0.1539532110821067&include_reel=true`;
    // const params = `{"id":"${userId}","first":${first},"after":"${endCursor}"}`
    // const transformParams = params.replace(',', '%2C')
    //     .replace('{', '%7B')
    //     .replace('}', '%7D')
    //     .replace(':', '%3A')
    //     .replace('"', '%22')
    //     .replace('=', '%3D');
    const data = await axios.get(url)
        .then(function (response) {
            // handle success
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    return res.status(200).json(data.users);
}
import axios from "axios";

const baseURL = "https://www.instagram.com"
const QUERY_PATH = (query_hash) => `/graphql/query/?query_hash=${query_hash}&variables=`;
const SEARCH_PATH = (query) => `/web/search/topsearch/?context=blended&query=${query}&rank_token=0.9681968460805339&include_reel=true`;
const LOCATION_PATH = QUERY_PATH("36bd0f2bf5911908de389b8ceaa3be6d");
const TAG_PATH = QUERY_PATH("9b498c08113f1e09617a1703c22b2f32");
const FEED_PATH = QUERY_PATH("003056d32c2554def87228bc3fd9668a");
const COMMENT_PATH = QUERY_PATH("bc3296d1ce80a24b1b6e40b1e72903f5");

const headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'pl,en-US;q=0.9,en;q=0.8,nl;q=0.7,nb;q=0.6',
    'cache-control': 'max-age=0',
    'cookie': 'ig_cb=2; ig_did=88BB498E-E955-405F-A830-3DB7BC47A8AE; mid=X-DhrwAEAAFWBn9a9lE9zRScjQRf; fbm_124024574287414=base_domain=.instagram.com; shbid=19194; datr=Ay8iYAsdTFJuw4kRnu92mOox; shbts=1613798901.7801588; rur=FRC; ig_lang=en; csrftoken=uvWkS4lMcOsld8BrOCp5zSFt60MUIrql; ds_user_id=46117109912; sessionid=46117109912%3AUZF6gBHttPTOA0%3A23; fbsr_124024574287414=dU9CwpI44710fO_JndPdiBk4uFIxc-l8ekT59nZ_xGM.eyJ1c2VyX2lkIjoiMTAwMDAxMTMyMjcxMzU5IiwiY29kZSI6IkFRQVNmX0RWVy1aaVNYYzkzOU9wYmloZHJVVkt6UU5mU3I2eHMtZlUzSnJ6bXAwTTJtSmdGT1lfbEVvOGhUN2ZmT3NfNS13N1k2WkYxT0dncDFfM3BCNHJFdzZaUTdTb2xGMlNwQzBCREp6S0lUcjVmREtCUEhhaFJHQXR5RTJfTU1wTC1XU1NhZWRnTm9WTEF3UHBjZ0JYdkd5WWhYWUk4TnpQYkRSQ1VfelFaOHN0RkRzejVEdFlzWU92ak5rSDFqanlGQUVlMDlPNlRDVnZnVUlObjJpYlAxSjNtVk5jcFpfYUtKbzh0QnEtTXppelZDQUk5S1I4bHBZYndEZTNxWFNpUkkwTzFZS19md0lNTzdNZk1Eem8xaG9wZ29QQnZpYTRSQzhmRXJMZ21yQV9CQkoxWlJqMmJTUU1GR2F3OG90VUp4emZmaGpKWXAzaTB3TkNLNmEzIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUZ0cFVmY3p5WkF4SjFSTnRmSG5XZXVTYXlnYXdvOWtRdjBJVlpCNHNvZTJHeW9xYk40ZFdIMXVQaHpxSjRKSldaQzQxQTE4dThzM2Q4emtobVVHYXRrb1B6UTZaQ3RobVZRWkFrbFVJWkNUSTF2c21ETU84dGFBWGJaQzVkSGJHZEl5V20zWkNtamVDM3RDdjE2VFFOdTYxRWh4am53VmQ3d1JxaUFxb3B2dCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjE0MjM0ODk3fQ',
    'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
}

const instagramFetch = axios.create({
    baseURL,
    headers
})

const convertPathParams = (paramsString) => {
    return paramsString.replace(/,/g, '%2C')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/:/g, '%3A')
        .replace(/"/g, '%22')
        .replace(/=/g, '%3D')
        .replace(/\\/g, '%5C');
}

export {
    instagramFetch,
    baseURL,
    convertPathParams,
    LOCATION_PATH,
    TAG_PATH,
    FEED_PATH,
    COMMENT_PATH,
    SEARCH_PATH
}
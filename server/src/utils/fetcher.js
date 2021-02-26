import axios from "axios";

const baseURL = "https://www.instagram.com"
const QUERY_PATH = (query_hash) => `/graphql/query/?query_hash=${query_hash}&variables=`;
const SEARCH_PATH = (query) => `/web/search/topsearch/?context=blended&query=${query}&rank_token=0.9681968460805339&include_reel=true`;
const LOCATION_PATH = QUERY_PATH("36bd0f2bf5911908de389b8ceaa3be6d");
const TAG_PATH = QUERY_PATH("9b498c08113f1e09617a1703c22b2f32");
const FEED_PATH = QUERY_PATH("003056d32c2554def87228bc3fd9668a");
const COMMENT_PATH = QUERY_PATH("bc3296d1ce80a24b1b6e40b1e72903f5");
const TAGGED_PATH = QUERY_PATH("31fe64d9463cbbe58319dced405c6206");
const STORIES_PATH = QUERY_PATH("d4d88dc1500312af6f937f7b804c68c3");

const headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'pl,en-US;q=0.9,en;q=0.8,nl;q=0.7,nb;q=0.6',
    'cache-control': 'max-age=0',
    'cookie': 'ig_did=88BB498E-E955-405F-A830-3DB7BC47A8AE; mid=X-DhrwAEAAFWBn9a9lE9zRScjQRf; fbm_124024574287414=base_domain=.instagram.com; shbid=19194; datr=Ay8iYAsdTFJuw4kRnu92mOox; ig_cb=2; shbts=1613798901.7801588; rur=FRC; ig_lang=en; csrftoken=eNH8y6nNnJ4BJEpekTOq9DGt07JjX7M1; ds_user_id=46186666448; sessionid=46186666448%3AhG2oDixH0aaHHr%3A23; fbsr_124024574287414=3L115jSduTiBDM6FnaV09XjGjGVjDk3WYq67noL8SII.eyJ1c2VyX2lkIjoiMTAwMDAxMTMyMjcxMzU5IiwiY29kZSI6IkFRRERBNXplMnNzSGZsQTBjN2E3RnBySkVvM1lNQUNlTU1jTmljZzJhb3dQX2J2eTA2TFhQNGpNY1FOaEFybnNnZ0RSS1hESlFXTlhYNWtqcWZTbGZySnlWUm0weldrQ1ctRnhjdWx1TzNFdGhEYTBKbE5kR1lzMHZlQjQ2M05TQ0FGZDNkUThQNUo2T0N5VmNlNXd6eW1nLW92SVJTTVp6VDFRZE9wQnVZaHFPN1pNVG1oNmgxTFBnSVNudGc1SVAtX3JiSFExZzBYSEU1WkNadk5Fc0tsdDZtbDQyR0J2LUtVRWhhT092dEo0MHp2a0tsbk5LNkZFdUJVWWdaUUVrS2tqTG5YVHZ0dVM1Z2tpTWhQRjFUU0cwNzBCMi0tc0xtLUN2WXNONzJZME1fMGVuZno3MVptTXFFaUNPSjZ3NkpzMW9RYmswNkNzN3pxV1ZhZkFmLVZmIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUVzdnB5cHc1U3pFWkF2R2dYR0dQRTZvUGZZRFZOeEFjTlZSUzlCenJBZlBzQlg5NVhFcGZUaVhjT0VBZ3VtQnpKdllIZU9aQWVvWkNLVE5ENkVIS0lSeUZaQ202YndCOHJjeEF3ZG52enJNR1cyNVJ1cFpBUkJWQW9EV3NaQ3dZRmFtU1pDWUlaQjFlcUE0WkNjczlibW9aQmJNWkIzNDE1emlNaWcxRkYyUEJMNyIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjE0MzE2MzQxfQ',
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
});

const convertPathParams = (params) => {
    const paramArray = [];
    for (const[key, value] of Object.entries(params)) {
        if (!value) {
            continue;
        }
        paramArray.push(`"${key}":"${value}"`)
    }
    const result = `{${paramArray.join(",")}}`;
    return replaceInString(result);
}

const replaceInString = (paramsString) => {
    return paramsString.replace(/,/g, '%2C')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/:/g, '%3A')
        .replace(/"/g, '%22')
        .replace(/=/g, '%3D')
        .replace(/\\/g, '%5C');
}

const errorHandling = (error) => {
    if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.statusText);
        return { error: true, errorStatus: error.response.status, errorMessage: error.response.statusText}
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return { error: true,  errorMessage: error.request.statusText}
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return { error: true,  errorMessage: error.message}
    }
}

const getGraphql = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response.data.graphql || response.data.data || response.data;
    } else {
        // throw error and go to catch block
        throw new Error(response.statusText);
    }
}

export {
    instagramFetch,
    baseURL,
    convertPathParams,
    LOCATION_PATH,
    TAG_PATH,
    FEED_PATH,
    COMMENT_PATH,
    TAGGED_PATH,
    STORIES_PATH,
    SEARCH_PATH,
    errorHandling,
    getGraphql
}
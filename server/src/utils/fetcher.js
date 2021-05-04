import axios from "axios";
import header from "./header.js";

const QUERY_PATH = (query_hash) => `/graphql/query/?query_hash=${query_hash}&variables=`;
const SEARCH_PATH = (query) => `/web/search/topsearch/?context=blended&query=${query}&rank_token=0.9681968460805339&include_reel=true`;

const INSTAGRAM_URL = "https://www.instagram.com"
const LOCATION_PATH = QUERY_PATH("36bd0f2bf5911908de389b8ceaa3be6d");
const TAG_PATH = QUERY_PATH("9b498c08113f1e09617a1703c22b2f32");
const FEED_PATH = QUERY_PATH("003056d32c2554def87228bc3fd9668a");
const COMMENT_PATH = QUERY_PATH("bc3296d1ce80a24b1b6e40b1e72903f5");
const TAGGED_PATH = QUERY_PATH("31fe64d9463cbbe58319dced405c6206");
const STORIES_PATH = QUERY_PATH("d4d88dc1500312af6f937f7b804c68c3");

const instaFetcher = axios.create({
    baseURL: INSTAGRAM_URL,
    headers: header
});

export {
    instaFetcher,
    INSTAGRAM_URL,
    LOCATION_PATH,
    TAG_PATH,
    FEED_PATH,
    COMMENT_PATH,
    TAGGED_PATH,
    STORIES_PATH,
    SEARCH_PATH
}

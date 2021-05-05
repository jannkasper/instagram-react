import * as axios from "axios";
import {
    instaFetcher,
    LOCATION_PATH,
    TAG_PATH,
    FEED_PATH,
    COMMENT_PATH,
    TAGGED_PATH,
    STORIES_PATH,
    SEARCH_PATH } from "../src/utils/fetcher";

// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");

describe("instaFetcher", () => {
    test("initialization", () => {
        expect(axios.create).toHaveBeenCalled()
    })
});

describe("paths", () => {
    test("LOCATION_PATH", () => {
        expect(LOCATION_PATH).toBe('/graphql/query/?query_hash=36bd0f2bf5911908de389b8ceaa3be6d&variables=');
    })
    test("TAG_PATH", () => {
        expect(TAG_PATH).toBe('/graphql/query/?query_hash=9b498c08113f1e09617a1703c22b2f32&variables=');
    })
    test("FEED_PATH", () => {
        expect(FEED_PATH).toBe('/graphql/query/?query_hash=003056d32c2554def87228bc3fd9668a&variables=');
    })
    test("COMMENT_PATH", () => {
        expect(COMMENT_PATH).toBe('/graphql/query/?query_hash=bc3296d1ce80a24b1b6e40b1e72903f5&variables=');
    })
    test("TAGGED_PATH", () => {
        expect(TAGGED_PATH).toBe('/graphql/query/?query_hash=31fe64d9463cbbe58319dced405c6206&variables=');
    })
    test("STORIES_PATH", () => {
        expect(STORIES_PATH).toBe('/graphql/query/?query_hash=d4d88dc1500312af6f937f7b804c68c3&variables=');
    })
    test("SEARCH_PATH", () => {
        expect(SEARCH_PATH("TEST")).toBe('/web/search/topsearch/?context=blended&query=TEST&rank_token=0.9681968460805339&include_reel=true');
    })
    test("SEARCH_PATH", () => {
        expect(SEARCH_PATH("")).toBe('/web/search/topsearch/?context=blended&query=&rank_token=0.9681968460805339&include_reel=true');
    })
});

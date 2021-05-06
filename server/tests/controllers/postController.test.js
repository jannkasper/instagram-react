import { mockRequest, mockResponse } from "./interceptor.js"
import { loadPost } from "../../src/controllers"
import { instaFetcher } from "../../src/utils/fetcher.js";

jest.mock('../../src/utils/fetcher.js');

describe("Check method \'loadHashtag\' ", () => {
    test('success request', async () => {
        const responseObject = JSON.stringify({ graphql: { shortcode_media: {shortcode: '1'} } });
        instaFetcher.get.mockImplementationOnce(() => Promise.resolve( { status: 200, data: "<script type=\"text/javascript\">window.__additionalDataLoaded('/p/COg1u7zicMM/'," + responseObject +")</script>" }));

        let req = mockRequest();
        req.params.postId = 'instagram';
        const res = mockResponse();

        await loadPost(req, res);

        const expected = {
            shortcode: "1",
            createdAt: undefined,
            description: undefined,
            id: undefined,
            isSidecar: false,
            isVideo: false,
            likes: undefined,
            location: undefined,
            owner: undefined,
            resourceArray: undefined,
            videoUrl: undefined,
            viewerHasLiked: undefined,
            viewerHasSaved: undefined,
            commentsData: null,
            sidecarArray: null
        }

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('bad request', async () => {
        const responseObject = JSON.stringify({ graphql: {} });
        instaFetcher.get.mockImplementationOnce(() => Promise.resolve( { status: 200, data: "<script type=\"text/javascript\">window.__additionalDataLoaded('/p/COg1u7zicMM/'," + responseObject +")</script>" }));

        let req = mockRequest();
        req.params.postId = 'instagram';
        const res = mockResponse();

        await loadPost(req, res);

        const expected = {
            error: true
        }

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(expected);
    });
});

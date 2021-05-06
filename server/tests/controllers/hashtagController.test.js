import { mockRequest, mockResponse } from "./interceptor.js"
import { loadHashtag } from "../../src/controllers"
import { instaFetcher } from "../../src/utils/fetcher.js";

jest.mock('../../src/utils/fetcher.js');


describe("Check method \'loadHashtag\' ", () => {
    test('success request', async () => {
        instaFetcher.get.mockImplementationOnce(() => Promise.resolve( { status: 200, data: { graphql: { hashtag : {} }}}));

        let req = mockRequest();
        req.params.tag = 'instagram';
        const res = mockResponse();

        await loadHashtag(req, res);

        const expected = {
            id: undefined,
            tagName: undefined,
            tagImageUrl: undefined,
            postCount: undefined,
            timelineMedia: {},
            topMedia: {}
        }

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('bad request', async () => {
        instaFetcher.get.mockImplementationOnce(() => Promise.resolve( { status: 500, statusText: 'CustomMessage' }));

        let req = mockRequest();
        req.params.tag = 'instagram';
        const res = mockResponse();

        await loadHashtag(req, res);

        const expected = {
            error: true,
            errorMessage: 'CustomMessage'
        }

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(expected);
    });
});

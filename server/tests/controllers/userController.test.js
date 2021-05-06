import { mockRequest, mockResponse } from "./interceptor.js"
import { loadUser } from "../../src/controllers"
import { instaFetcher } from "../../src/utils/fetcher.js";

jest.mock('../../src/utils/fetcher.js');

describe("Check method \'loadHashtag\' ", () => {
    test('success request', async () => {
        const responseObject = JSON.stringify({ entry_data: { ProfilePage: [{graphql: {user: {id: '1'}}}] } });
        instaFetcher.get.mockImplementationOnce(() => Promise.resolve( { status: 200, data: "<script type=\"text/javascript\">window._sharedData = " + responseObject +";</script>" }));

        let req = mockRequest();
        req.params.username = 'instagram';
        const res = mockResponse();

        await loadUser(req, res);

        const expected = {
            id: '1',
            username: undefined,
            name: undefined,
            userImageUrl: undefined,
            bio: undefined,
            bioUrl: undefined,
            bioUrlName: undefined,
            postCount: undefined,
            followersCount: undefined,
            followingsCount: undefined,
            isVerified: false,
            isPrivate: false,
            hasClips: false,
            hasStories: false,
            mutualFollow: undefined,
            timelineMedia: {}
        }

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('bad request', async () => {
        const responseObject = JSON.stringify({ entry_data: {  } });
        instaFetcher.get.mockImplementationOnce(() => Promise.resolve( { status: 200, data: "<script type=\"text/javascript\">window._sharedData = " + responseObject +";</script>" }));

        let req = mockRequest();
        req.params.username = 'instagram';
        const res = mockResponse();

        await loadUser(req, res);

        const expected = {
            error: true,
            errorMessage: 'Cannot read property \'0\' of undefined'
        }

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(expected);
    });
});

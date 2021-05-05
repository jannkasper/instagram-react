import { hashtagToHashtagDTO } from "../../src/mappers";

describe("loggedToLoggedDTO(instagramLogged)", () => {
    test("with NULL", () => {
        expect(hashtagToHashtagDTO(null)).toBeNull();
    })

    test("with {}", () => {
        const expected = {
            id: undefined,
            tagName: undefined,
            tagImageUrl: undefined,
            postCount: undefined
        }
        expect(hashtagToHashtagDTO({})).toEqual(expected);
    })
    test("with {id: '1'}", () => {
        const expected = {
            id: '1',
            tagName: undefined,
            tagImageUrl: undefined,
            postCount: undefined
        }
        expect(hashtagToHashtagDTO({id : '1'})).toEqual(expected);
    })
})

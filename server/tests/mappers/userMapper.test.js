import { loggedToLoggedDTO, userToUserDTO } from "../../src/mappers";

describe("userToUserDTO(user)", () => {
    test("with NULL", () => {
        expect(userToUserDTO(null)).toBeNull();
    })

    test("with {}", () => {
        const expected = {
            id: undefined,
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
        }
        expect(userToUserDTO({})).toEqual(expected);
    })
    test("with {id: '1'}", () => {
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
        }
        expect(userToUserDTO({id : '1'})).toEqual(expected);
    })
})

describe("loggedToLoggedDTO(instagramLogged)", () => {
    test("with NULL", () => {
        expect(loggedToLoggedDTO(null)).toBeNull();
    })

    test("with {}", () => {
        const expected = {
            id: undefined,
            username: undefined,
            userImageUrl: undefined,
        }
        expect(loggedToLoggedDTO({})).toEqual(expected);
    })
    test("with {id: '1'}", () => {
        const expected = {
            id: '1',
            username: undefined,
            userImageUrl: undefined,
        }
        expect(loggedToLoggedDTO({id : '1'})).toEqual(expected);
    })
})

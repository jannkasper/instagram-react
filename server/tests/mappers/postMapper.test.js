import { postCollectionToPostCollectionDTO, postToPostMinimumDTO, postToPostDTO } from "../../src/mappers";

describe("postCollectionToPostCollectionDTO(instagramPostCollection)", () => {
    test("with NULL", () => {
        expect(postCollectionToPostCollectionDTO(null)).toBeNull();
    })

    test("with {edges: []}", () => {
        expect(postCollectionToPostCollectionDTO({edges: []})).toEqual([]);
    })
})

describe("postToPostMinimumDTO(instagramPost)", () => {
    test("with NULL", () => {
        expect(postToPostMinimumDTO(null)).toBeNull();
    })

    test("with {}", () => {
        const expected = {
            postId: undefined,
            likeCount: undefined,
            commentCount: undefined,
            isVideo: false,
            isSidecar: false,
            thumbnailArray : undefined,
            thumbnailSrc:  undefined,
        }
        expect(postToPostMinimumDTO({})).toEqual(expected);
    })

    test("with {shortcode: '1'}", () => {
        const expected = {
            postId: '1',
            likeCount: undefined,
            commentCount: undefined,
            isVideo: false,
            isSidecar: false,
            thumbnailArray : undefined,
            thumbnailSrc:  undefined,
        }
        expect(postToPostMinimumDTO({shortcode: '1'})).toEqual(expected);
    })
})

describe("postToPostDTO(instagramPost)", () => {
    test("with NULL", () => {
        expect(postToPostDTO(null)).toBeNull();
    })

    test("with {}", () => {
        const expected = {
            shortcode: undefined,
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
        }
        expect(postToPostDTO({})).toEqual(expected);
    })

    test("with {shortcode: '1'}", () => {
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
        }
        expect(postToPostDTO({shortcode: '1'})).toEqual(expected);
    })
})

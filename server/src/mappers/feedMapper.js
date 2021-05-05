import { pageInfoToPageIntoDTO } from "./pageInfoMapper.js";
import { postToPostMinimumDTO } from "./postMapper.js";

export function feedCollectionToFeedCollectionDTO(instagramFeed) {
    if (!instagramFeed) {
        return null;
    }

    const feedCollectionDTO = { mediaArray: [] };

    if (instagramFeed.page_info) {
        feedCollectionDTO.pageInfo = pageInfoToPageIntoDTO(instagramFeed.page_info);
    }

    for (let edge of instagramFeed.edges) {
        const postMinimum = postToPostMinimumDTO(edge.node);
        feedCollectionDTO.mediaArray.push(postMinimum)
    }

    return feedCollectionDTO;
}

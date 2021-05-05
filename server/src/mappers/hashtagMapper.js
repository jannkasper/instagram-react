export function hashtagToHashtagDTO(instagramHashtag) {
    if (!instagramHashtag) {
        return null;
    }

    const hashtagDTO =  {
        id: instagramHashtag.id,
        tagName: instagramHashtag.name,
        tagImageUrl: instagramHashtag.profile_pic_url,
        postCount: instagramHashtag.edge_hashtag_to_media?.count,
    };

    return hashtagDTO;
}

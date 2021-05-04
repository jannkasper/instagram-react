export function postToPostDTO(instagramPost) {
    const postDTO = {
        id: instagramPost.id,
        shortcode: instagramPost.shortcode,
        isVideo: instagramPost.is_video,
        isSidecar: Boolean(instagramPost.edge_sidecar_to_children),
        videoUrl: instagramPost.video_url,
        resourceArray: instagramPost.display_resources,
        createdAt: instagramPost.taken_at_timestamp,
        description: instagramPost.edge_media_to_caption?.edges?.map(el => el.node.text).shift(),
        location: instagramPost.location && {
            id: instagramPost.location.id,
            slug: instagramPost.location.slug,
            name: instagramPost.location.name
        },
        owner: {
            id: instagramPost.owner.id,
            username: instagramPost.owner.username,
            userImageUrl: instagramPost.owner.profile_pic_url,
            isVerified: instagramPost.owner.is_verified,
        },
        likes: {
            count: instagramPost.edge_media_preview_like.count,
            userArray: instagramPost.edge_media_preview_like.edges?.map(el => el.node)
        },
        viewerHasLiked: instagramPost.viewer_has_liked,
        viewerHasSaved: instagramPost.viewer_has_saved,
    };

    return postDTO;
}

export function postToPostMinimumDTO(instagramPost) {
    const postMinimumDTO = {
        postId: instagramPost.shortcode,
        likeCount: instagramPost.edge_liked_by?.count || instagramPost.edge_media_preview_like?.count,
        commentCount: instagramPost.edge_media_to_comment?.count,
        isVideo: instagramPost.is_video,
        isSidecar: instagramPost.edge_sidecar_to_children && instagramPost.edge_sidecar_to_children.edges.length > 0,
        thumbnailArray : instagramPost.thumbnail_resources,
        thumbnailSrc:  instagramPost.thumbnail_src,
    }

    return postMinimumDTO;
}

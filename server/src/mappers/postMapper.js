import { commentCollectionToCommentCollectionDTO } from "./commentMapper.js";
import { sidecarCollectionToSidecarCollectionDTO } from "./sidecarMapper.js";

export function postCollectionToPostCollectionDTO(instagramPostCollection) {
    if (!instagramPostCollection) {
        return null;
    }

    const postCollection = [];

    for (let edge of instagramPostCollection.edges) {
        if (edge.node.__typename !== 'GraphImage' && edge.node.__typename !== 'GraphVideo' && edge.node.__typename !== 'GraphSidecar') {
            continue;
        }

        const postDTO = postToPostDTO(edge.node);
        postDTO.commentsData = commentCollectionToCommentCollectionDTO(edge.node.edge_media_preview_comment);
        postDTO.sidecarArray = sidecarCollectionToSidecarCollectionDTO(edge.node.edge_sidecar_to_children);
        postCollection.push(postDTO)
    }

    return postCollection;
}

export function postToPostDTO(instagramPost) {
    if (!instagramPost) {
        return instagramPost;
    }

    const postDTO = {
        id: instagramPost.id,
        shortcode: instagramPost.shortcode,
        isVideo: Boolean(instagramPost.is_video),
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
        owner: instagramPost.owner && {
            id: instagramPost.owner.id,
            username: instagramPost.owner.username,
            userImageUrl: instagramPost.owner.profile_pic_url,
            isVerified: instagramPost.owner.is_verified,
        },
        likes: instagramPost.edge_media_preview_like && {
            count: instagramPost.edge_media_preview_like.count,
            userArray: instagramPost.edge_media_preview_like.edges?.map(el => el.node)
        },
        viewerHasLiked: instagramPost.viewer_has_liked,
        viewerHasSaved: instagramPost.viewer_has_saved,
    };

    return postDTO;
}

export function postToPostMinimumDTO(instagramPost) {
    if (!instagramPost) {
        return instagramPost;
    }

    const postMinimumDTO = {
        postId: instagramPost.shortcode,
        likeCount: instagramPost.edge_liked_by?.count || instagramPost.edge_media_preview_like?.count,
        commentCount: instagramPost.edge_media_to_comment?.count,
        isVideo: Boolean(instagramPost.is_video),
        isSidecar: Boolean(instagramPost.edge_sidecar_to_children && instagramPost.edge_sidecar_to_children.edges.length > 0),
        thumbnailArray : instagramPost.thumbnail_resources,
        thumbnailSrc:  instagramPost.thumbnail_src,
    }

    return postMinimumDTO;
}

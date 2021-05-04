import { pageInfoToPageIntoDTO } from "./pageInfoMapper.js";

export function commentCollectionToCommentCollectionDTO(instagramCommentCollection) {
    const commentCollectionDTO = { count: instagramCommentCollection.count, commentsArray: []};

    if (instagramCommentCollection.page_info) {
        commentCollectionDTO.pageInfo = pageInfoToPageIntoDTO(instagramCommentCollection.page_info);
    }

    for (let edge of instagramCommentCollection.edges) {
        const commentDTO = commentToCommentDTO(edge.node);
        commentCollectionDTO.commentsArray.push(commentDTO);
    }

    return commentCollectionDTO;
}

function commentToCommentDTO(comment) {
    const commentDTO = {
        id: comment.id,
        createdAt: comment.created_at,
        likes: comment.edge_liked_by?.count,
        text: comment.text,
        viewerHasLiked: comment.viewer_has_liked,
        owner: {
            id: comment.owner.id,
            username: comment.owner.username,
            userImageUrl: comment.owner.profile_pic_url,
            isVerified: comment.owner.is_verified,
        }
    }

    return commentDTO;
}

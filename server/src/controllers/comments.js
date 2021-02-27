import {COMMENT_PATH, convertPathParams, errorHandling, getGraphql, instagramFetch} from "../utils/fetcher.js";

export const instagramCommentsToCommentsCollection = (instagramCommentCollection) => {
    const commentsCollection = { count: instagramCommentCollection.count, commentsArray: []};

    if (instagramCommentCollection.page_info) {
        commentsCollection.pageInfo = { hasNextPage:  instagramCommentCollection.page_info.has_next_page, endCursor: instagramCommentCollection.page_info.end_cursor };
    }

    for (let edge of instagramCommentCollection.edges) {
        edge = edge.node;
        commentsCollection.commentsArray.push({
            id: edge.id,
            createdAt: edge.created_at,
            likes: edge.edge_liked_by.count,
            owner: {
                id: edge.owner.id,
                username: edge.owner.username,
                userImageUrl: edge.owner.profile_pic_url,
                isVerified: edge.owner.is_verified,
            },
            text: edge.text,
            viewerHasLiked: edge.viewer_has_liked,
        });
    }

    return commentsCollection;
}

export const loadComments = async (req, res) => {
    let { shortcode, first, endCursor} = req.query;
    endCursor = endCursor.replace(/"/g, '\\"').replace(/ /g, "+")
    const params = `{"shortcode":"${shortcode}","first":${first},"after":"${endCursor}"}`

    const graphql = await instagramFetch.get(COMMENT_PATH + convertPathParams({shortcode: shortcode, first: first, after: endCursor}))
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.shortcode_media) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = instagramCommentsToCommentsCollection(graphql.shortcode_media.edge_media_to_parent_comment)
    return res.status(200).json(convertedData);
}
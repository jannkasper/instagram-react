import {COMMENT_PATH, convertPathParams, errorHandling, getGraphql, instagramFetch} from "../utils/fetcher.js";
import { commentCollectionToCommentCollectionDTO } from "../mappers/index.js";

export const loadComments = async (req, res) => {
    const { shortcode, first, endCursor} = req.query;
    const encodedParamsURL = convertPathParams({ shortcode: shortcode, first: first, after: endCursor.replace(/"/g, '\\"').replace(/ /g, "+") })

    const graphql = await instagramFetch.get(COMMENT_PATH + encodedParamsURL)
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.shortcode_media) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = commentCollectionToCommentCollectionDTO(graphql.shortcode_media.edge_media_to_parent_comment)
    return res.status(200).json(responseData);
}

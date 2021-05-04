import {COMMENT_PATH, instaFetcher} from "../utils/fetcher.js";
import { commentCollectionToCommentCollectionDTO } from "../mappers/index.js";
import { decodeParamObject } from "../utils/formatter.js";
import { errorHandler, graphqlHandler } from "../utils/handler.js";

export const loadComments = async (req, res) => {
    const { shortcode, first, endCursor} = req.query;
    const decodedParamsURL = decodeParamObject({ shortcode: shortcode, first: first, after: endCursor.replace(/"/g, '\\"').replace(/ /g, "+") })

    const graphql = await instaFetcher.get(COMMENT_PATH + decodedParamsURL)
        .then(graphqlHandler)
        .catch(errorHandler);

    if (graphql.error || !graphql.shortcode_media) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = commentCollectionToCommentCollectionDTO(graphql.shortcode_media.edge_media_to_parent_comment)
    return res.status(200).json(responseData);
}

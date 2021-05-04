import { instaFetcher, STORIES_PATH} from "../utils/fetcher.js";
import { errorHandler, graphqlHandler } from "../utils/handler.js";
import { storyCollectionToStoryCollectionDTO } from "../mappers/index.js";
import { decodeParamObject } from "../utils/formatter.js";

export const loadUserStories = async (req, res) => {
    const { userId } = req.query;
    const decodedParamsURL = decodeParamObject({user_id: userId, include_chaining: true, include_reel: true, include_suggested_users: false, include_logged_out_extras: false, include_highlight_reels: true, include_live_status: true });

    const graphql = await instaFetcher.get(STORIES_PATH + decodedParamsURL)
        .then(graphqlHandler)
        .catch(errorHandler);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseArray = storyCollectionToStoryCollectionDTO(graphql.user.edge_highlight_reels)
    return res.status(200).json(responseArray);
}

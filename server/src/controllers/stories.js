import {convertPathParams, errorHandling, getGraphql, instagramFetch, STORIES_PATH} from "../utils/fetcher.js";
import { storyCollectionToStoryCollectionDTO } from "../mappers/index.js";

export const loadUserStories = async (req, res) => {
    const { userId } = req.query;
    const graphql = await instagramFetch.get(STORIES_PATH + convertPathParams({user_id: userId, include_chaining: true, include_reel: true, include_suggested_users: false, include_logged_out_extras: false, include_highlight_reels: true, include_live_status: true }))
        .then(getGraphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const convertedData = storyCollectionToStoryCollectionDTO(graphql.user.edge_highlight_reels)
    return res.status(200).json(convertedData);
}

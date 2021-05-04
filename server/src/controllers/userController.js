import { instagramFetch, errorHandling } from "../utils/fetcher.js";
import { feedCollectionToFeedCollectionDTO, userToUserDTO } from "../mappers/index.js";

export const loadUser = async (req, res) => {
    const username = req.params.username;

    const graphql = await instagramFetch.get(`/${username}`)
        .then(response => response.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/))
        .then(response => response[1].slice(0, -1))
        .then(response => JSON.parse(response))
        .then(response => response.entry_data.ProfilePage[0].graphql)
        .catch(errorHandling);

    if (graphql.error || !graphql.user) {
        return res.status(200).json({error: true, ...graphql});
    }

    const responseData = { timelineMedia: {} };
    Object.assign(responseData, userToUserDTO(graphql.user));
    Object.assign(responseData.timelineMedia, feedCollectionToFeedCollectionDTO(graphql.user.edge_owner_to_timeline_media));

    return res.status(200).json(responseData);
}

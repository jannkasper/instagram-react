import { instagramFetch, SEARCH_PATH } from "../utils/fetcher.js";

export const searchContent = async (req, res) => {
    const query = req.params.query;
    const data = await instagramFetch.get(SEARCH_PATH(query))
        .then(function (response) {
            // handle success
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    const result = [];
    data.users.forEach(item => result.push({user: true, position: item.position, username:item.user.username, name: item.user.username, description: item.user.full_name, imageUrl: item.user.profile_pic_url, isVerified: item.user.is_verified }));
    data.places.forEach(item => result.push({place: true, position: item.position, id: item.place.location.pk, slug: item.place.slug, name: item.place.title, description: item.place.subtitle }))
    data.hashtags.forEach(item => result.push({hashtag: true, position: item.position,  name: item.hashtag.name, postCount: item.hashtag.media_count, imageUrl: item.hashtag.profile_pic_url}))

    result.sort((a,b) => a.position - b.position);
    return res.status(200).json(result);
}
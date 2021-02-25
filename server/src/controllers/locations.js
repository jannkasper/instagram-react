import { instagramFetch, convertPathParams, LOCATION_PATH } from "../utils/fetcher.js";
import { transformMediaData } from "./posts.js";

export const locationContent = async (req, res) => {
    const {locationId, locationName} = req.params;

    const path = `/explore/locations/${locationId}/${locationName}/?__a=1`;

    const data = await instagramFetch.get(path)
        .then(function (response) {
            // handle success
            if (response.data.graphql?.location) {
                return response.data.graphql.location;
            }
            return  null
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    if (data == null) {
        return res.status(200).json({hasError: true, message: 'Tag not exists!'});
    }

    const cleanData = convertLocationData(data);
    return res.status(200).json(cleanData);
}

export const nextPageLocationContent = async (req, res) => {
    const {locationId, first, endCursor} = req.query;
    const params = `{"id":"${locationId}","first":${first},"after":"${endCursor}"}`

    const data = await instagramFetch.get(LOCATION_PATH + convertPathParams(params))
        .then(function (response) {
            // handle success
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    console.log("FINISH FETCH POSTS")
    if (data?.data?.location?.edge_location_to_media) {
        console.log("TRANSFORM POSTS")
        const result = transformMediaData(data.data.location.edge_location_to_media);
        return res.status(200).json(result);
    }
    console.log("EMPTY POSTS")
    return res.status(200).json();
}

const convertLocationData = (fetchData) => {
    const locationData = {
        id: fetchData.id,
        locationName: fetchData.name,
        lat: fetchData.lat,
        lng: fetchData.lng,
        addressJson: fetchData.address_json,
        locationImageUrl: fetchData.profile_pic_url,
        postCount: fetchData.edge_location_to_media.count,
    };

    locationData.topMedia = transformMediaData(fetchData.edge_location_to_top_posts);
    locationData.timelineMedia = transformMediaData(fetchData.edge_location_to_media);

    return locationData;
}
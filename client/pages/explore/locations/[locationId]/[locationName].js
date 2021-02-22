import React, { useEffect, useState, useContext } from 'react'
import Layout from "../../../../components/layout";
import FeedGallery from "../../../../components/page-gallery";
import HeaderExplore from "../../../../components/page-header/header-explore";
import { Instagram } from "../../../../components/icons";
import { ScrollContext } from "../../../../store/scroll";
import { publicFetch } from "../../../../util/fetcher";

export default function LocationName ({ locationId, locationName }) {
    const { triggerLoad, setTriggerLoad } = useContext(ScrollContext);
    const [locationData, setLocationData] = useState(null)

    useEffect( () => {
        publicFetch.get(`/locations/${locationId}/${locationName}`).then( response => {
            if (!response.data.hasError) {
                setLocationData(response.data);
            }
        })
    }, [locationId]);

    useEffect( () => {
        if (triggerLoad && locationData) {
            const params = {
                locationId: locationId,
                first: 12,
                endCursor: locationData.timelineMedia.pageInfo.endCursor
            };
            publicFetch.get(`/locations/${locationId}/${locationName}/page`, { params }).then( response => {
                setTriggerLoad(false);
                setLocationData({
                    ...locationData,
                    timelineMedia: { pageInfo: response.data.pageInfo, mediaArray: locationData.timelineMedia.mediaArray.concat(response.data.mediaArray) }
                })
            })
        }
    }, [triggerLoad]);

    if (locationData) {
        return (
            <Layout>
                <HeaderExplore isLocation id={locationData.id} postCount={locationData.postCount} name={locationData.locationName} imageUrl={locationData.locationImageUrl} />
                <FeedGallery mediaArray={locationData.topMedia.mediaArray} title='Top posts' />
                <FeedGallery mediaArray={locationData.timelineMedia.mediaArray} title='Most recent' />
            </Layout>
        )
    } else {
        return ( <Instagram /> );
    }
}

export async function getServerSideProps(context) {
    const {locationId, locationName} = context.params
    return {
        props: {
            locationId,
            locationName
        }
    }
}
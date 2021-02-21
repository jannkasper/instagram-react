import React, { useEffect, useState, useContext } from 'react'
import Layout from "../../../../components/layout";
import FeedGallery from "../../../../components/feed-gallery";
// import UserItem from "../components/user-item";
import { Instagram } from "../../../../components/icons";
import { ScrollContext } from "../../../../store/scroll";
import { publicFetch } from "../../../../util/fetcher";

import styles from '../../../../styles/Home.module.css'
import ExploreHeader from "../../../../components/explore-header";


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

    return (
        locationData ? (
            <Layout>
                <main className={styles.postContainer}>
                    <ExploreHeader isLocation id={locationData.id} postCount={locationData.postCount} name={locationData.locationName} imageUrl={locationData.locationImageUrl} />
                    <FeedGallery mediaArray={locationData.topMedia.mediaArray}/>
                    <FeedGallery mediaArray={locationData.timelineMedia.mediaArray}/>
                </main>
            </Layout>
        ) : <Instagram />
    )
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
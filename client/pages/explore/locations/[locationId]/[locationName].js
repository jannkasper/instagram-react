import React, { useEffect, useState } from 'react'
import Layout from "../../../../components/layout";
import FeedGallery from "../../../../components/feed-gallery";
// import UserItem from "../components/user-item";
import {publicFetch} from "../../../../store/fetcher";
import {Instagram} from "../../../../components/icons";

import styles from '../../../../styles/Home.module.css'


export default function LocationName ({ locationId, locationName }) {
    const [locationData, setLocationData] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    useEffect( () => {
        const fetchLocation = async () => {
            const { data } = await publicFetch.get(`/locations/${locationId}/${locationName}`)
            if (!data.hasError) {
                setLocationData(data);
            }
            setIsFetching(false);
        }
        setIsFetching(true);
        fetchLocation();
    }, [locationId]);


    const fetchNextPage = async () => {
        const params = {
            locationId: locationId,
            first: 12,
            endCursor: locationData.timelineMedia.pageInfo.endCursor
        };
        const { data } = await publicFetch.get(`/locations/${locationId}/${locationName}/page`, { params })
        if (!data) {
            return;
        }
        setLocationData(
            {
                ...locationData,
                timelineMedia: { pageInfo: data.pageInfo, mediaArray: locationData.timelineMedia.mediaArray.concat(data.mediaArray) }
            })
        setIsFetching(false);
    }

    const scrollFunc = (event) => {
        event.preventDefault();
        let currentHeight = window.pageYOffset + document.documentElement.clientHeight;
        let maxHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight );
        if (!isFetching && locationData?.timelineMedia?.pageInfo.hasNextPage && currentHeight > maxHeight - 800) {
            setIsFetching(true);
            fetchNextPage();
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollFunc, false)
        return () => {
            window.removeEventListener("scroll", scrollFunc)
        }
    }, [isFetching])

    return (
        locationData ? (
            <Layout>
                <main className={styles.postContainer}>
                    {/*<UserItem userData={userData} />*/}
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
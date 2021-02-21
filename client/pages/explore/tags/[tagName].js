import React, { useEffect, useState } from 'react'
import Layout from "../../../components/layout";
import FeedGallery from "../../../components/feed-gallery";
// import UserItem from "../components/user-item";
import {publicFetch} from "../../../store/fetcher";
import {Instagram} from "../../../components/icons";

import styles from '../../../styles/Home.module.css'


export default function TagName({ tagName }) {
    const [tagData, setTagData] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    useEffect( () => {
        const fetchTag = async () => {
            const { data } = await publicFetch.get(`/tags/${tagName}`)
            if (!data.hasError) {
                setTagData(data);
            }
            setIsFetching(false);
        }
        setIsFetching(true);
        fetchTag();
    }, [tagName]);


    const fetchNextPage = async () => {
        const params = {
            tagName: tagName,
            first: 12,
            endCursor: tagData.timelineMedia.pageInfo.endCursor
        };
        const { data } = await publicFetch.get(`/tags/${tagName}/page`, { params })
        if (!data) {
            return;
        }
        setTagData(
            {
                ...tagData,
                timelineMedia: { pageInfo: data.pageInfo, mediaArray: tagData.timelineMedia.mediaArray.concat(data.mediaArray) }
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
        if (!isFetching && tagData?.timelineMedia?.pageInfo.hasNextPage && currentHeight > maxHeight - 800) {
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
        tagData ? (
            <Layout>
                <main className={styles.postContainer}>
                    {/*<UserItem userData={userData} />*/}
                    <FeedGallery mediaArray={tagData.topMedia.mediaArray}/>
                    <FeedGallery mediaArray={tagData.timelineMedia.mediaArray}/>
                </main>
            </Layout>
        ) : <Instagram />
    )
}

export async function getServerSideProps(context) {
    const tagName = context.params.tagName
    return {
        props: {
            tagName
        }
    }
}
import React, { useEffect, useState } from 'react'
import Layout from "../components/layout";
import FeedGallery from "../components/feed-gallery";
import UserItem from "../components/user-item";
import {publicFetch} from "../store/fetcher";
import {Instagram} from "../components/icons";
import UserPrivate from "../components/user-private";

import styles from '../styles/Home.module.css'


export default function Username({ username }) {
    const [userData, setUserData] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    useEffect( () => {
        const fetchUser = async () => {
            const { data } = await publicFetch.get(`/users/${username}`)
            if (!data.hasError) {
                setUserData(data);
            }
            setIsFetching(false);
        }
        setIsFetching(true);
        fetchUser();
    }, [username]);


    const fetchNextPage = async () => {
        const params = {
            userId: userData.id,
            first: 12,
            endCursor: userData.timelineMedia.pageInfo.endCursor
        };
        const { data } = await publicFetch.get(`/users/${username}/page`, { params })
        if (!data) {
            return;
        }
        setUserData(
            {
                ...userData,
                timelineMedia: { pageInfo: data.pageInfo, mediaArray: userData.timelineMedia.mediaArray.concat(data.mediaArray) }
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
        if (!isFetching && userData?.timelineMedia?.pageInfo.hasNextPage && currentHeight > maxHeight - 800) {
            setIsFetching(true);
            console.log("HIII")
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
        userData ? (
            <Layout>
                <main className={styles.postContainer}>
                    <UserItem userData={userData} />
                    { userData.isPrivate ? <UserPrivate /> : <FeedGallery mediaArray={userData.timelineMedia.mediaArray}/> }
                </main>
            </Layout>
            ) : <Instagram />
    )
}

export async function getServerSideProps(context) {
    const username = context.params.username
    return {
        props: {
            username
        }
    }
}
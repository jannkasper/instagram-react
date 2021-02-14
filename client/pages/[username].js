import React, { useEffect, useState } from 'react'
import Layout from "../components/layout";
import FeedGallery from "../components/feed-gallery";

import styles from '../styles/Home.module.css'
import UserItem from "../components/user-item";
import {publicFetch} from "../store/fetcher";
import {Instagram} from "../components/icons";


export default function Username({ username }) {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await publicFetch.get(`/users/${username}`)
            console.log(data);
            setUserData(data)
        }
        fetchUser();
    }, [username])

    return (
        userData ? (
            <Layout>
                <main className={styles.postContainer}>
                    <UserItem userData={userData} />
                    <FeedGallery mediaArray={userData.mediaArray} />
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
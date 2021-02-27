import React, { useEffect, useState, useContext } from 'react'
import Layout from "../components/layout";
import FeedGallery from "../components/page-gallery";
import ContentPrivate from "../components/page-header/content-private";
import { Instagram } from "../components/icons";
import { ScrollContext } from "../store/scroll";
import { publicFetch } from "../util/fetcher";
import HeaderStories from "../components/page-header/header-stories";
import HeaderUser from "../components/page-header/header-user";
import Router from 'next/router'


export default function Username({ username }) {
    const { triggerLoad, setTriggerLoad } = useContext(ScrollContext);
    const [userData, setUserData] = useState(null);
    const [currentFeed, setCurrentFeed] = useState('timelineMedia');

    useEffect( () => {
        publicFetch.get(`/users/${username}`).then( response => {
            if (response.data.error) {
                Router.push('/404')
            } else {
                Promise.resolve()
                    .then(() => setUserData(response.data))
                    // .then(() => fetchStories());
            }
        })
    }, [username]);

    useEffect( () => {
        if (triggerLoad && userData) {
            const params = {
                userId: userData.id,
                first: 12,
                endCursor: userData[currentFeed].pageInfo.endCursor
            };
            publicFetch.get(`/users/${username}/${currentFeed}/page`, { params }).then( response => {
                setTriggerLoad(false);
                setUserData({
                    ...userData,
                    [currentFeed]: { pageInfo: response.data.pageInfo, mediaArray: userData[currentFeed].mediaArray.concat(response.data.mediaArray) }
                })
            })
        }
    }, [triggerLoad]);

    useEffect( () => {
        if (userData && !userData[currentFeed]) {
            const params = {
                userId: userData.id,
                first: 12,
            };
            publicFetch.get(`/users/${username}/${currentFeed}/page`, { params }).then( response => {
                setUserData({
                    ...userData,
                    [currentFeed]: response.data
                })
            })
        }
    }, [currentFeed]);

    if (userData) {
        return (
            <Layout>
                <HeaderUser userData={userData} />
                { userData.hasStories && <HeaderStories username={username} userId={userData.id} /> }
                { userData.isPrivate ? <ContentPrivate /> : <FeedGallery mediaArray={userData[currentFeed]?.mediaArray} setCurrentFeed={setCurrentFeed}/> }
            </Layout>
        )
    } else {
        return ( <Instagram /> );
    }
}

export async function getServerSideProps(context) {
    const username = context.params.username
    return {
        props: {
            username
        }
    }
}
import React, { useEffect, useState, useContext } from 'react'
import Layout from "../components/layout";
import FeedGallery from "../components/page-gallery";
import ContentPrivate from "../components/page-header/content-private";
import { Instagram } from "../components/icons";
import { ScrollContext } from "../store/scroll";
import { publicFetch } from "../util/fetcher";
import HeaderStories from "../components/page-header/header-stories";
import HeaderUser from "../components/page-header/header-user";
import Stories from "../components/page-main/stories";

export default function Username({ username }) {
    const { triggerLoad, setTriggerLoad } = useContext(ScrollContext);
    const [userData, setUserData] = useState(null);

    useEffect( () => {
        publicFetch.get(`/users/${username}`).then( response => {
            if (!response.data.hasError) {
                setUserData(response.data);
            }
        })
    }, [username]);

    useEffect( () => {
        if (triggerLoad && userData) {
            const params = {
                userId: userData.id,
                first: 12,
                endCursor: userData.timelineMedia.pageInfo.endCursor
            };
            publicFetch.get(`/users/${username}/page`, { params }).then( response => {
                setTriggerLoad(false);
                setUserData({
                    ...userData,
                    timelineMedia: { pageInfo: response.data.pageInfo, mediaArray: userData.timelineMedia.mediaArray.concat(response.data.mediaArray) }
                })
            })
        }
    }, [triggerLoad]);

    if (userData) {
        return (
            <Layout>
                <HeaderUser userData={userData} />
                { userData.storiesArray && userData.storiesArray.length && <HeaderStories storiesArray={userData.storiesArray} /> }
                { userData.isPrivate ? <ContentPrivate /> : <FeedGallery mediaArray={userData.timelineMedia.mediaArray}/> }
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
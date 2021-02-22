import React, { useEffect, useState, useContext } from 'react'
import Layout from "../components/layout";
import FeedGallery from "../components/feed-gallery";
import UserItem from "../components/user-item";
import UserPrivate from "../components/user-private";
import { Instagram } from "../components/icons";
import { ScrollContext } from "../store/scroll";
import { publicFetch } from "../util/fetcher";

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
                <UserItem userData={userData} />
                { userData.isPrivate ? <UserPrivate /> : <FeedGallery mediaArray={userData.timelineMedia.mediaArray}/> }
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
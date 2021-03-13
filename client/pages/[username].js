import React, { useState, useEffect, useContext } from "react";
import { ScrollContext } from "../store/scroll";
import Layout from "../components/layout";
import { Instagram } from "../components/icons";
import InstagramGrid from "../components/instagram-grid";
import InstagramProfile from "../components/instagram-profile";
import InstagramStories from "../components/instagram-stories";
import ContentPrivate from "../components/private";
import {fetchState, fetchExtendState} from "../util/context";

export default function Username({ username }) {
    const [dataState, setDataState] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const { triggerLoad, setTriggerLoad } = useContext(ScrollContext);

    useEffect(() => {
        fetchState(setDataState,`/users/${username}`)
    }, [username])

    useEffect(async () => {
        if (triggerLoad && !isFetching && dataState) {
            setIsFetching(true);
            await fetchExtendState(dataState, setDataState, `/users/${username}/timelineMedia/page`, { userId: dataState.id, first: 12, endCursor: dataState.timelineMedia.pageInfo.endCursor });
            setTriggerLoad(false);
        }
        setIsFetching(false);
    }, [triggerLoad])

    if (dataState) {
        return (
            <Layout>
                <InstagramProfile userData={dataState} />
                { dataState.hasStories && <InstagramStories username={username} userId={dataState.id} /> }
                { dataState.isPrivate && <ContentPrivate /> }
                { !dataState.isPrivate && dataState.timelineMedia.mediaArray && <InstagramGrid useTabGroup mediaArray={dataState.timelineMedia.mediaArray} setCurrentFeed={null}/> }
            </Layout>
        )
    } else {
        return ( <Instagram /> );
    }
};

export async function getServerSideProps(context) {
    const username = context.params.username
    return {
        props: {
            username
        }
    }
}
import React, { useEffect, useContext, useState } from 'react'
import Layout from "../../../components/layout";
import InstagramExplore from "../../../components/instagram-explore";
import InstagramGrid from "../../../components/instagram-grid";
import { Instagram } from "../../../components/icons";
import { ScrollContext } from "../../../store/scroll";
import {DataContext} from "../../../store/data";
import {fetchExtendState, fetchState} from "../../../util/context";

export default function TagName({ tagName }) {
    const [dataState, setDataState] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const { triggerLoad, setTriggerLoad } = useContext(ScrollContext);

    useEffect(() => {
        fetchState(setDataState,`/tags/${tagName}`)
    }, [tagName])

    useEffect(async () => {
        if (triggerLoad && !isFetching && dataState) {
            setIsFetching(true);
            await fetchExtendState(dataState, setDataState, `/tags/${tagName}/page`, { tagName: tagName, first: 12, endCursor: dataState.timelineMedia.pageInfo.endCursor });
            setTriggerLoad(false);
        }
        setIsFetching(false);
    }, [triggerLoad])

    if (dataState) {
        return (
            <Layout>
                <InstagramExplore isTag id={dataState.id} postCount={dataState.postCount} name={dataState.tagName} imageUrl={dataState.tagImageUrl} />
                <InstagramGrid mediaArray={dataState.topMedia.mediaArray} title='Top posts' />
                <InstagramGrid mediaArray={dataState.timelineMedia.mediaArray} title='Most recent' />
            </Layout>
        )
    } else {
        return ( <Instagram /> );
    }
}

export async function getServerSideProps(context) {
    const tagName = context.params.tagName
    return {
        props: {
            tagName,
        }
    }
}
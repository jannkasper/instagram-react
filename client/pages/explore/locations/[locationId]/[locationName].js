import React, { useEffect, useContext, useState } from 'react'
import { ScrollContext } from "../../../../store/scroll";
import Layout from "../../../../components/layout";
import InstagramExplore from "../../../../components/instagram-explore";
import InstagramGrid from "../../../../components/instagram-grid";
import { Instagram } from "../../../../components/icons";
import {fetchExtendState, fetchState} from "../../../../util/context";

export default function LocationName ({ locationId, locationName }) {
    const [dataState, setDataState] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const { triggerLoad, setTriggerLoad } = useContext(ScrollContext);

    useEffect(() => {
        fetchState(setDataState,`/locations/${locationId}/${locationName}`)
    }, [locationId])

    useEffect(async () => {
        if (triggerLoad && !isFetching && dataState) {
            setIsFetching(true);
            await fetchExtendState(dataState, setDataState, `/locations/${locationId}/${locationName}/page`, { locationId: locationId, first: 12, endCursor: dataState.timelineMedia.pageInfo.endCursor });
            setTriggerLoad(false);
        }
        setIsFetching(false);
    }, [triggerLoad])

    if (dataState) {
        return (
            <Layout>
                <InstagramExplore isLocation id={dataState.id} postCount={dataState.postCount} name={dataState.locationName} imageUrl={dataState.locationImageUrl} />
                <InstagramGrid mediaArray={dataState.topMedia.mediaArray} title='Top posts' />
                <InstagramGrid mediaArray={dataState.timelineMedia.mediaArray} title='Most recent' />
            </Layout>
        )
    } else {
        return ( <Instagram /> );
    }
}

export async function getServerSideProps(context) {
    const {locationId, locationName} = context.params
    return {
        props: {
            locationId,
            locationName,

        }
    }
}
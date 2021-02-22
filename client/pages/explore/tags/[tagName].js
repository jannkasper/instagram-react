import React, { useEffect, useState, useContext } from 'react'
import Layout from "../../../components/layout";
import FeedGallery from "../../../components/feed-gallery";
import ExploreHeader from "../../../components/explore-header";
import { Instagram } from "../../../components/icons";
import { ScrollContext } from "../../../store/scroll";
import { publicFetch } from "../../../util/fetcher";

import styles from '../../../styles/Home.module.css'



export default function TagName({ tagName }) {
    const { triggerLoad, setTriggerLoad } = useContext(ScrollContext);
    const [tagData, setTagData] = useState(null);

    useEffect( () => {
        publicFetch.get(`/tags/${tagName}`).then( response => {
            if (!response.data.hasError) {
                setTagData(response.data);
            }
        })
    }, [tagName]);

    useEffect( () => {
        if (triggerLoad && tagData) {
            const params = {
                tagName: tagName,
                first: 12,
                endCursor: tagData.timelineMedia.pageInfo.endCursor
            };

            publicFetch.get(`/tags/${tagName}/page`, { params }).then( response => {
                setTriggerLoad(false);
                setTagData({
                    ...tagData,
                    timelineMedia: { pageInfo: response.data.pageInfo, mediaArray: tagData.timelineMedia.mediaArray.concat(response.data.mediaArray) }
                })
            })
        }
    }, [triggerLoad]);

    return (
        tagData ? (
            <Layout>
                <ExploreHeader isTag id={tagData.id} postCount={tagData.postCount} name={tagData.tagName} imageUrl={tagData.tagImageUrl} />
                <FeedGallery mediaArray={tagData.topMedia.mediaArray} title='Top posts' />
                <FeedGallery mediaArray={tagData.timelineMedia.mediaArray} title='Most recent' />
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
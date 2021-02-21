import Layout from "../../components/layout";
import FeedItemMain from "../../components/feed-item-main";
import FeedGallery from "../../components/feed-gallery";

import styles from '../../styles/Home.module.css'
import {useEffect, useState} from "react";
import {publicFetch} from "../../util/fetcher";
import {Instagram} from "../../components/icons";


export default function Post({ postShortcode }) {
    const [postData, setPostData] = useState(null)
    const [mediaData, setMediaData] = useState(null)

    useEffect( () => {
        publicFetch.get(`/posts/${postShortcode}`).then( response => {
            if (!response.data.hasError) {
                setPostData(response.data);
                fetchMoreMedia(response.data.owner.id, 12 , undefined)
            }
        })
    }, [postShortcode]);

    const fetchMoreMedia = async (userId, first, endCursor) => {
        const params = {
            userId: userId,
            first: first,
            after: endCursor
        }
        publicFetch.get(`/posts/${postShortcode}/more`, { params }).then( response => {
            setMediaData(response.data);
        });
    }

    return (
        postData ? (
            <Layout>
                <div className={styles.postContainer}>
                    <FeedItemMain postData={postData} />
                    <FeedGallery mediaArray={mediaData?.mediaArray}/>
                </div>
            </Layout>
        ) : <Instagram />
    )
};


export async function getServerSideProps(context) {
    const postShortcode = context.params.postShortcode
    return {
        props: {
            postShortcode
        }
    }
}
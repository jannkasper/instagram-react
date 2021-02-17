import Layout from "../../components/layout";
import FeedItemMain from "../../components/feed-item-main";
import FeedGallery from "../../components/feed-gallery";

import styles from '../../styles/Home.module.css'
import {useEffect, useState} from "react";
import {publicFetch} from "../../store/fetcher";
import {Instagram} from "../../components/icons";


export default function Post({ postShortcode }) {
    const [postData, setPostData] = useState(null)
    const [mediaData, setMediaData] = useState(null)

    const fetchMoreMedia = async (userId, first, endCursor) => {
        const config = {
            params: {
                userId: userId,
                first: first,
                after: endCursor
            }
        }
        const { data } = await publicFetch.get(`/posts/${postShortcode}/more`, config);
        setMediaData(data);
    }

    useEffect( () => {
        const fetchPost = async () => {
            const { data } = await publicFetch.get(`/posts/${postShortcode}`);
            setPostData(data);
            fetchMoreMedia(data.owner.id, 12 , undefined)
        }
        fetchPost();
    }, [postShortcode]);

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
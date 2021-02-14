import Layout from "../../components/layout";
import FeedItemMain from "../../components/feed-item-main";
import FeedGallery from "../../components/feed-gallery";

import styles from '../../styles/Home.module.css'


export default function Post() {
    return (
        <Layout>
            <div className={styles.postContainer}>
                <FeedItemMain/>
                <FeedGallery />
            </div>
        </Layout>
    )
}
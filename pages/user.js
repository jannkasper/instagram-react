import Layout from "../components/layout";
import FeedItemMain from "../components/feed-item-main";
import FeedGallery from "../components/feed-gallery";

import styles from '../styles/Home.module.css'
import UserItem from "../components/user-item";


export default function User() {
    return (
        <Layout>
            <main className={styles.postContainer}>
                <UserItem />
                <FeedGallery />
            </main>
        </Layout>
    )
}
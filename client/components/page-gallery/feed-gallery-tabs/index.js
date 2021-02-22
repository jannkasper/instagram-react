import React from "react";
import FeedGalleryTab from "../feed-gallery-tab";
import { Posts, Tagged } from "../../icons";

import styles from "./feed-gallery-tabs.module.css";

const FeedGalleryTabs = () => {
    return (
        <div className={styles.feedGalleryTabs}>
            <FeedGalleryTab title='Posts' icon={<Posts/>} />
            <FeedGalleryTab title='Tagged' icon={<Tagged/>} />
        </div>
    )
}

export default FeedGalleryTabs
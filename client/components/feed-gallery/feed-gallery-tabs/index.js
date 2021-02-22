import React from "react";
import { Posts, Tagged } from "../../icons";

import styles from "./feed-gallery-tabs.module.css";

const FeedGalleryTabs = () => {

    return (
        <div className={styles.feedGalleryTabs}>
                <span className={styles.galleryTab} style={{opacity: true ? 1 : 0.5}}>
                    <Posts />
                    <span className={styles.tabName}>Posts</span>
                </span>
            <span className={styles.galleryTab} style={{opacity: false ? 1 : 0.5}}>
                    <Tagged />
                    <span className={styles.tabName}>Tagged</span>
                </span>
        </div>
    )
}

export default FeedGalleryTabs
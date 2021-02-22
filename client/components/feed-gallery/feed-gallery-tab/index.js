import React from "react";

import styles from "./feed-gallery-tab.module.css";

const FeedGalleryTab = ({ title, icon }) => {

    return (
            <span className={styles.feedGalleryTab} style={{opacity: true ? 1 : 0.5}}>
                {icon}
                <span className={styles.feedGalleryTab_title}>{title}</span>
            </span>
    )
}

export default FeedGalleryTab
import React from "react";

import styles from "./stories-item.module.css";

const StoriesItem = ({ content }) => {

    return (
        <div className={styles.storiesItemContainer}>
            <div className={styles.storyImage}>
                <img src={content.src} />
            </div>
            <div className={styles.storyName}>{content.title}</div>
        </div>
    )
}

export default StoriesItem
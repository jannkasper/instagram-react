import React from "react";

import styles from "./stories-item.module.css";

const StoriesItem = () => {

    return (
        <div className={styles.storiesItemContainer}>
            <div className={styles.storyImage}>
                <img src="../../../../static/images/horizontal.jpeg"/>
            </div>
            <div className={styles.storyName}>partieangelique</div>
        </div>
    )
}

export default StoriesItem
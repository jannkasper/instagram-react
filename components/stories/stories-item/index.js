import React from "react";

import styles from "./stories-item.module.css";

const StoriesItem = () => {

    return (
        <div className={styles.storiesItemContainer}>
            <div className={styles.userImage}>
                <img src="../../../static/images/avatar1.png"/>
            </div>
            <div className={styles.userName}>partieangelique</div>
        </div>
    )
}

export default StoriesItem
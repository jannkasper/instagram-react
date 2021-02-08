import React from "react";

import styles from "./feed-item-content.module.css"

const FeedItemContent = () => {

    return (
        <div className={styles.contentImage}>
            <img src="../../../static/images/avatar.jpg"/>
        </div>
    );
}

export default FeedItemContent
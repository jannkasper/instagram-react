import React from "react";

import styles from "./feed-item-content.module.css"

const FeedItemContent = () => {

    return (
        <div className={styles.contentImage}>
            <img src="../../../static/images/horizontal.jpeg"/>
        </div>
    );
}

export default FeedItemContent
import React from "react";

import styles from "./feed-item-content.module.css"

const FeedItemContent = ({ resourceArray }) => {

    return (
        <div className={styles.contentImage}>
            <img src={resourceArray[1].src}/>
        </div>
    );
}

export default FeedItemContent
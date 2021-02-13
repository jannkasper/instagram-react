import React from "react";
import FeedItemHeader from "./feed-item-header";
import FeedItemContent from "./feed-item-content";
import FeedItemActions from "./feed-item-actions";

import styles from "./feed-item.module.css"

const FeedItem = () => {

    return (
        <div className={styles.feedItemContainer}>
            <FeedItemHeader />
            <FeedItemContent />
            <FeedItemActions />
        </div>
    );
}

export default FeedItem
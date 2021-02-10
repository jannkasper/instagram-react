import React from "react";
import FeedItemHeader from "./feed-item-header";
import FeedItemContent from "./feed-item-content";
import FeedItemActions from "./feed-item-actions";

import styles from "./feed-item-main.module.css"
import FeedItemAddComment from "./feed-item-add-comment";
import FeedItemComments from "./feed-item-comments";

const FeedItemMain = () => {

    return (
        <div className={styles.feedItemMainContainer}>
            <div className={styles.feedItemMainContent}>
                <FeedItemContent />
            </div>
            <div className={styles.feedItemMainDescription}>
                <FeedItemHeader />
                <FeedItemComments />
                <FeedItemActions />
                <FeedItemAddComment />
            </div>
        </div>
    );
}

export default FeedItemMain
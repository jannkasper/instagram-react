import React from "react";

import styles from "./feed-item-comments.module.css"
import Comment from "./comment";

const FeedItemComments = () => {

    return (
        <div className={styles.feedItemCommentsContainer}>
                <div className={styles.feedItemCommentsSlider}>
                    <Comment feedDescription />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                </div>
        </div>
    );
}

export default FeedItemComments
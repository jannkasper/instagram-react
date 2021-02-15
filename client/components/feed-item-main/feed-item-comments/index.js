import React from "react";
import Comment from "./comment";

import styles from "./feed-item-comments.module.css"

const FeedItemComments = ({ commentsData, owner, text, createdAt }) => {

    return (
        <div className={styles.feedItemCommentsContainer}>
                <div className={styles.feedItemCommentsSlider}>
                    <Comment feedDescription owner={owner} text={text} createdAt={createdAt} />
                    {commentsData.commentsArray.map((el, index) => <Comment key={index} {...el} />)}

                </div>
        </div>
    );
}

export default FeedItemComments
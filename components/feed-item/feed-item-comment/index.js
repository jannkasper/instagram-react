import React, { useState } from "react";

import styles from "./feed-item-comment.module.css"

const FeedItemComment = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className={styles.feedItemCommentContainer}>
            <a className={styles.commentUserName}>partieangelique</a>
            <span className={!showMore ? styles.commentTextDescription : "inherit"}>
                { false || "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"}
            </span>
            {!showMore && (
                <span className={styles.showMore} onClick={() => setShowMore(true)}>
                    {" "} more
                </span>
            )}
        </div>
    );
}

export default FeedItemComment
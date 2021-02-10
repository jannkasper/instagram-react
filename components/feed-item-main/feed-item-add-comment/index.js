import React, { useRef, useState } from "react";

import styles from "./feed-item-add-comment.module.css"
import {Emoji} from "../../icons";

const FeedItemAddComment= () => {
    const changeRef = useRef(null);
    const [textAreaSize, setAreaSize] = useState(18);
    const [isTyped, setTyped] = useState(false);

    return (
        <form method="POST" className={styles.addCommentContainer}>
            <div className={styles.addCommentEmoji}>
                <Emoji />
            </div>
            <textarea
                className={styles.addCommentInput}
                style={{ height: textAreaSize }}
                placeholder="Add Comment..."
                aria-label="Add Comment..."
                ref={changeRef}
                onChange={(e) => {
                    setAreaSize(changeRef.current.scrollHeight);
                    setTyped(e.target.value.length > 0);
                }}
            />
            <button className={styles.addCommentButton} style={{ opacity: isTyped ? 1 : 0.3 }}>
                Share
            </button>
        </form>
    );
}

export default FeedItemAddComment
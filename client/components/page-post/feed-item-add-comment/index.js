import React, { useRef, useState } from "react";

import styles from "./feed-item-add-comment.module.css"
import {Emoji} from "../../icons";
import Button from "../../button";

const FeedItemAddComment= () => {
    const changeRef = useRef(null);
    const [textAreaSize, setAreaSize] = useState(18);
    const [isTyping, setTyping] = useState(false);

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
                    setTyping(e.target.value.length > 0);
                }}
            />
            <Button secondary active={isTyping}>
                Post
            </Button>
        </form>
    );
}

export default FeedItemAddComment
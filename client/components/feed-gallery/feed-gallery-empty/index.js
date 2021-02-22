import React from "react";
import {Camera} from "../../icons";

import styles from "./feed-gallery-empty.module.css";

const FeedGalleryEmpty = () => {
    return (
        <>
            <div className={styles.feedGalleryEmpty_icon}>
                <Camera />
            </div>
            <div className={styles.feedGalleryEmpty_message}>No Posts Yet</div>
        </>
    )
}

export default FeedGalleryEmpty
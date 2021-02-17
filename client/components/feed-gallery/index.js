import React from "react";

import styles from "./feed-gallery.module.css";
import FeedGalleryItem from "./feed-gallery-item";
import {Camera, Posts, Tagged} from "../icons";

const FeedGallery = ({ mediaArray }) => {
    let result = [];
    if (mediaArray && mediaArray.length > 0) {
        mediaArray = mediaArray.map((element, index) => <FeedGalleryItem key={index} mediaData={element} />)
        for (let position = 0; position <= mediaArray.length; position += 3 ) {
            result.push(
                <div key={position} className={styles.galleryRow}>
                    {mediaArray.slice(position, position+3)}
                </div>
            )
        }
    } else {
        result = (
            <>
                <div className={styles.emptyIconCircle}>
                    <Camera />
                </div>
                <div className={styles.emptyMessage}>No Posts Yet</div>
            </>
        )
    }
    return (
        <div className={styles.feedGalleryContainer}>
            {/*<div className={styles.galleryDescription}>*/}
            {/*    More posts from <a className={styles.galleryUserName}>partieangelique</a>*/}
            {/*</div>*/}
            <div className={styles.feedGalleryTabs}>
                <span className={styles.galleryTab} style={{opacity: true ? 1 : 0.5}}>
                    <Posts />
                    <span className={styles.tabName}>Posts</span>
                </span>
                <span className={styles.galleryTab} style={{opacity: false ? 1 : 0.5}}>
                    <Tagged />
                    <span className={styles.tabName}>Tagged</span>
                </span>
            </div>
            <div className={styles.feedGalleryContent}>
                {result}
            </div>

        </div>
    )
}
export default FeedGallery
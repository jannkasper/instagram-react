import React from "react";

import styles from "./feed-gallery.module.css";
import FeedGalleryItem from "./feed-gallery-item";

const FeedGallery = ({ mediaArray }) => {
    console.log(mediaArray);
    let result = [];

    if (mediaArray) {
        mediaArray = mediaArray.map((element, index) => <FeedGalleryItem key={index} mediaData={element} />)
        for (let position = 0; position <= mediaArray.length; position += 3 ) {
            result.push(
                <div className={styles.galleryRow}>
                    {mediaArray.slice(position, position+3)}
                </div>
            )
        }
    }
    return (
        <div className={styles.feedGalleryContainer}>
            {/*<div className={styles.galleryDescription}>*/}
            {/*    More posts from <a className={styles.galleryUserName}>partieangelique</a>*/}
            {/*</div>*/}

            <div className={styles.feedGalleryContent}>
                {result}
            </div>

        </div>
    )
}
export default FeedGallery
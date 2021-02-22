import React from "react";

import styles from "./feed-gallery.module.css";
import FeedGalleryItem from "./feed-gallery-item";
import {Camera} from "../icons";
import FeedGalleryTabs from "./feed-gallery-tabs";

const FeedGallery = ({ mediaArray, title }) => {
    const determineContent = () => {
        const result = []
        if (mediaArray && mediaArray.length > 0) {
            mediaArray = mediaArray.map((element, index) => <FeedGalleryItem key={index} mediaData={element} />)
            for (let position = 0; position <= mediaArray.length; position += 3 ) {
                result.push(
                    <div key={position} className={styles.galleryRow}>
                        {mediaArray.slice(position, position+3)}
                    </div>
                )
            }
        return result
        } else {
            return (
                <>
                    <div className={styles.emptyIconCircle}>
                        <Camera />
                    </div>
                    <div className={styles.emptyMessage}>No Posts Yet</div>
                </>
            )
        }
    }

    const determineHeader = () => {
        if (title) {
            return (
                <div className={styles.galleryDescription}>
                    {title}
                    {/*<a className={styles.galleryUserName}>partieangelique</a>*/}
                </div>
            )
        } else {
            return <FeedGalleryTabs />
        }
    }
    return (
        <div className={styles.feedGalleryContainer}>
            { determineHeader() }
            <div className={styles.feedGalleryContent}>
                { determineContent() }
            </div>

        </div>
    )
}
export default FeedGallery
import React from "react";
import FeedGalleryItem from "./feed-gallery-item";
import FeedGalleryTabs from "./feed-gallery-tabs";
import FeedGalleryEmpty from "./feed-gallery-empty";

import styles from "./page-gallery.module.css";

const FeedGallery = ({ mediaArray, title, setCurrentFeed }) => {

    const Content = [];
    if (mediaArray && mediaArray.length > 0) {
        for (let index = 0; index <= mediaArray.length; index += 3 ) {
            Content.push(
                <div key={index} className={styles.feedGallery_row}>
                    {mediaArray.slice(index, index + 3).map((element, index) => <FeedGalleryItem key={index} mediaData={element}/>)}
                </div>
            )
        }
    } else {
        Content.push( <FeedGalleryEmpty /> )
    }

    const Header = title ? (
        <div className={styles.feedGallery_header}>
            {title}
            {/*<a className={styles.galleryUserName}>partieangelique</a>*/}
        </div>
    ) : <FeedGalleryTabs setCurrentFeed={setCurrentFeed} />

    return (
        <div className={styles.feedGalleryContainer}>
            { Header }
            <div className={styles.feedGalleryContent}>
                { Content }
            </div>

        </div>
    )
}
export default FeedGallery
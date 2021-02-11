import React from "react";

import styles from "./feed-gallery.module.css";

const FeedGallery = () => {
    return (
        <div className={styles.feedGalleryContainer}>
            {/*<div className={styles.galleryDescription}>*/}
            {/*    More posts from <a className={styles.galleryUserName}>partieangelique</a>*/}
            {/*</div>*/}
            <div className={styles.feedGalleryContent}>
                <div className={styles.galleryRow}>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                </div>

                <div className={styles.galleryRow}>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                </div>

                <div className={styles.galleryRow}>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                </div>

                <div className={styles.galleryRow}>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                </div>

                <div className={styles.galleryRow}>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                    <div className={styles.galleryImage}>
                        <img src="../../../static/images/horizontal.jpeg"/>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default FeedGallery
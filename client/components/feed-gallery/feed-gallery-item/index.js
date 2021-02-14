import React from "react";
import Link from 'next/link'

import styles from "./feed-gallery-item.module.css";

const FeedGalleryItem = ({ mediaData }) => {

    return (
        <Link href="/p/[postId]" as={`/p/${mediaData.postId}`}>
            <div className={styles.galleryImage}>
                    <img src={mediaData.thumbnailArray[1].src} />
            </div>
        </Link>
    )
}

export default FeedGalleryItem
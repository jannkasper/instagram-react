import React from "react";
import Link from 'next/link'
import { ActivityActive, CommentActive } from "../../icons";
import { numFormatter } from "../../../util/formatter";

import styles from "./feed-gallery-item.module.css";

const FeedGalleryItem = ({ mediaData }) => {

    return (
        <Link href="/p/[postId]" as={`/p/${mediaData.postId}`}>
            <div className={styles.galleryImage}>
                    <img src={mediaData.thumbnailArray[1].src} />
                    <div className={styles.hover}>
                        <div className={styles.details}>
                            <ActivityActive fill={"white"} style={{marginRight: "10px"}} />
                            <p>{numFormatter(mediaData.likeCount)}</p>
                        </div>
                        <div className={styles.details}>
                            <CommentActive fill={"white"} background-color={"black"} style={{marginRight: "10px"}} />
                            <p>{numFormatter(mediaData.commentCount)}</p>
                        </div>
                    </div>
            </div>
        </Link>
    )
}

export default FeedGalleryItem
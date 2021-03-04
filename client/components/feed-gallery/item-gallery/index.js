import React from "react";
import Link from 'next/link'
import { ActivityActive, CommentActive } from "../../icons";
import { numFormatter } from "../../../util/formatter";

import styles from "./item-gallery.module.css";

const ItemGallery = ({ mediaData }) => {

    const AdditionalIcon = () => {
        if (mediaData.isVideo || mediaData.isSidecar) {
            const mediaType = mediaData.isVideo ? "video" : (mediaData.isSidecar ? "sidecar" : "");
            return (
                <div className={styles.feedGalleryItem_iconBox}>
                    <span className={[styles.feedGalleryItem_icon, styles[`feedGalleryItem_${mediaType}Icon`]].join(' ')}></span>
                </div>
            )
        }
    }

    return (
        <Link href="/p/[postId]" as={`/p/${mediaData.postId}`}>
            <div className={styles.feedGalleryItem}>
                <img src={mediaData.thumbnailSrc || mediaData.thumbnailArray[1].src} />
                { AdditionalIcon() }

                <div className={styles.feedGalleryItem_hover}>
                    <div className={styles.feedGalleryItem_count}>
                        <ActivityActive fill={"white"} style={{marginRight: "10px"}} />
                        <p>{numFormatter(mediaData.likeCount)}</p>
                    </div>
                    <div className={styles.feedGalleryItem_count}>
                        <CommentActive fill={"white"} style={{marginRight: "10px"}} />
                        <p>{numFormatter(mediaData.commentCount)}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ItemGallery
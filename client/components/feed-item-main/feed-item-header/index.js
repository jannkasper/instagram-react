import React from "react";

import styles from "./feed-item-header.module.css"
import { More } from "../../icons";
import Link from "next/link";

const FeedItemHeader = ({ owner, location }) => {

    return (
        <div className={styles.header}>
            <img className={styles.userImage} src={owner.userImageUrl}/>
            <div className={styles.headerText}>
                <Link href="/[username]" as={`/${owner.username}`}>
                    <div className={styles.userName}>{owner.username}</div>
                </Link>
                <div className={styles.localization}>{location}</div>
            </div>
            <div className={styles.moreIcon}>
                <More />
            </div>
        </div>
    );
}

export default FeedItemHeader
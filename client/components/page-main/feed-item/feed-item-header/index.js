import React from "react";

import styles from "./feed-item-header.module.css"
import { More } from "../../../icons";

const FeedItemHeader = () => {

    return (
        <div className={styles.header}>
            <img className={styles.userImage} src="../../static/images/avatar1.png"/>
            <div className={styles.headerText}>
                <div className={styles.userName}>partieangelique</div>
                <div className={styles.localization}>Poznan, Poland</div>
            </div>
            <div className={styles.moreIcon}>
                <More />
            </div>
        </div>
    );
}

export default FeedItemHeader
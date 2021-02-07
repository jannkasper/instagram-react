import React from "react";

import styles from "./post.module.css"
import {More} from "../icons";

const Post = () => {

    return (
        <div className={styles.postContent}>
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
            <div className={styles.contentImage}>
                <img src="../../static/images/avatar.jpg"/>
            </div>
        </div>
    );
}

export default Post
import React from "react";
import Router from "next/router";
import {Activity, Comment, Message, Save} from "../../icons";

import styles from "./feed-item-actions.module.css"

const FeedItemActions = () => {

    return (
        <div className={styles.feedItemActionsContainer}>
            <div className={styles.itemButtonGroup}>
                <Activity height={24} width={24} size={24} />
                <Comment height={24} width={24} size={24} />
                <Message height={24} width={24} size={24} />
                <Save height={24} width={24} size={24} />
            </div>
            <a className={styles.itemLikes} href="#">{"0"} likes</a>
            <br/>
            <a className={styles.itemDateText} onClick={() => Router.push("/post/[pid]", `/post/${data?.pid || "post-test"}`)} >
                {false || "12 hours ago"}
            </a>
        </div>
    );
}

export default FeedItemActions
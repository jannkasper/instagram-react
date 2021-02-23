import React from "react";
import Router from "next/router";

import styles from "./feed-item-actions.module.css"
import {Activity, Comment, Message, Save} from "../../../icons";
import FeedItemComment from "../feed-item-comment";
import FeedItemAddComment from "../feed-item-add-comment";

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
            <FeedItemComment />
            <a className={styles.viewAllComments} onClick={() => Router.push("/post/[pid]", `/post/${false || "post-test"}`)}>
                View all {false || "0"} comment
            </a>
            <FeedItemComment />
            <FeedItemComment />
            <a className={styles.itemDateText} onClick={() => Router.push("/post/[pid]", `/post/${data?.pid || "post-test"}`)} >
                {false || "12 hours ago"}
            </a>
            <FeedItemAddComment />
        </div>
    );
}

export default FeedItemActions
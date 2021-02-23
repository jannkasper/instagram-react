import React from "react";
import {Activity, Comment, Message, Save} from "../../icons";
import { dateFormatter, numCommaFormatter } from "../../../util/formatter";

import styles from "./feed-item-actions.module.css"

const FeedItemActions = ({ likes, createdAt, viewerHasLiked, viewerHasSaved }) => {

    return (
        <div className={styles.feedItemActionsContainer}>
            <div className={styles.itemButtonGroup}>
                <Activity height={24} width={24} size={24} />
                <Comment height={24} width={24} size={24} />
                <Message height={24} width={24} size={24} />
                <Save height={24} width={24} size={24} />
            </div>
            <a className={styles.itemLikes} href="#">{numCommaFormatter(likes.count)} likes</a>
            <br/>
            <a className={styles.itemDateText} href="#" >
                {dateFormatter(createdAt)}
            </a>
        </div>
    );
}

export default FeedItemActions
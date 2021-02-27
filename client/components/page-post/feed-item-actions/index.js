import React from "react";
import {Activity, Comment, Message, Save} from "../../icons";
import { dateFormatter, numCommaFormatter } from "../../../util/formatter";

import styles from "./feed-item-actions.module.css"

const FeedItemActions = ({ likes, createdAt, viewerHasLiked, viewerHasSaved }) => {

    return (
        <div className={styles.feedItemActionsContainer}>
            <div className={styles.itemButtonGroup}>
                <Activity/>
                <Comment/>
                <Message/>
                <Save/>
            </div>
            <div className={styles.infoGroup}>
                <a className="label" href="#">{numCommaFormatter(likes.count)} likes</a>
                <br/>
                {createdAt ?
                    <a className="info small grey" href="#">
                        {dateFormatter(createdAt)}
                    </a>
                    : null}
            </div>
        </div>
    );
}

export default FeedItemActions
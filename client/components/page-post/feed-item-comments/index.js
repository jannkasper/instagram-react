import React, { useState } from "react";
import Comment from "./comment";

import styles from "./feed-item-comments.module.css"
import {publicFetch} from "../../../util/fetcher";
import {DynamicIcon} from "../../icons";
import Button from "../../button";

const FeedItemComments = ({ commentsData1, owner, text, createdAt, shortcode }) => {
    const [commentsData, setCommentsData] = useState(commentsData1);

    function loadComments() {
        if (commentsData && commentsData.pageInfo?.hasNextPage) {
            const params = {
                shortcode: shortcode,
                first: 12,
                endCursor: commentsData.pageInfo.endCursor
            };
            publicFetch.get(`/posts/${shortcode}/comments`, {params}).then(response => {
                setCommentsData({
                    ...commentsData,
                    commentsArray: commentsData.commentsArray.concat(response.data.commentsArray),
                    pageInfo: response.data.pageInfo
                })
            })
        }
    }

    return (
        <div className={styles.feedItemCommentsContainer}>
            <div className={styles.feedItemCommentsSlider}>
                {text && <Comment feedDescription owner={owner} text={text} createdAt={createdAt}/>}
                {commentsData.commentsArray.map((el, index) => <Comment key={index} {...el} />)}
                {commentsData.pageInfo?.hasNextPage && (
                    <Button className={styles.moreComments} onClick={loadComments}>
                        <DynamicIcon type="plus"/>
                    </Button>
                )}
            </div>
        </div>
    );
}

export default FeedItemComments
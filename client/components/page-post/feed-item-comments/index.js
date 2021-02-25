import React, { useState } from "react";
import Comment from "./comment";

import styles from "./feed-item-comments.module.css"
import {publicFetch} from "../../../util/fetcher";

const FeedItemComments = ({ commentsData1, owner, text, createdAt, shortcode }) => {
    const [commentsData, setCommentsData] = useState(commentsData1);
    const handleClick = () => {
        if (commentsData && commentsData.pageInfo?.hasNextPage) {
            const params = {
                shortcode: shortcode,
                first: 12,
                endCursor: commentsData.pageInfo.endCursor
            };
            publicFetch.get(`/posts/${shortcode}/comments`, { params }).then( response => {
                setCommentsData({
                    ...commentsData,
                    commentsArray:  commentsData.commentsArray.concat(response.data.commentsArray),
                    pageInfo: response.data.pageInfo
                })
            })
        }
    }


    return (
        <div className={styles.feedItemCommentsContainer}>
                <div className={styles.feedItemCommentsSlider}>
                    {text ?<Comment feedDescription owner={owner} text={text} createdAt={createdAt} /> : null }
                    {commentsData.commentsArray.map((el, index) => <Comment key={index} {...el} />)}
                    {commentsData.pageInfo?.hasNextPage ?
                        <button className={styles.moreComments} onClick={handleClick}><span className={styles.moreCommentsIcon}></span></button>
                        : null
                    }
                </div>
        </div>
    );
}

export default FeedItemComments
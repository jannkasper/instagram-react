import React, { useState } from "react";
import Comment from "./comment";

import styles from "./feed-item-comments.module.css"
import {publicFetch} from "../../../util/fetcher";
import {DynamicIcon} from "../../icons";
import Button from "../../button";
import ScrollWrapper from "../../scroll-wrapper";

const FeedItemComments = ({ initialCommentsData, owner, text, createdAt, shortcode }) => {
    const [commentsData, setCommentsData] = useState(initialCommentsData);

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
        <ScrollWrapper whiteSpace="normal" hideScrollbar={true} flex="1 1 auto">
                { text &&
                <Comment
                    feedDescription
                    owner={owner}
                    text={text}
                    createdAt={createdAt}
                />}
                { commentsData.commentsArray.map((el, index) => <Comment key={index} {...el} />)}
                { commentsData.pageInfo?.hasNextPage && (
                    <Button className={styles.addComments} onClick={loadComments}>
                        <DynamicIcon type="plus"/>
                    </Button>
                )}
        </ScrollWrapper>
    );
}

export default FeedItemComments
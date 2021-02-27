import React from "react";
import Router from "next/router";
import FeedItemHeader from "../../page-post/feed-item-header";
import FeedItemContent from "../../page-post/feed-item-content";
import FeedItemActions from "../../page-post/feed-item-actions";
import MainPageComment from "./feed-item-comment";
import FeedItemAddComment from "../../page-post/feed-item-add-comment";
// import FeedItemHeader from "./feed-item-header";
// import FeedItemContent from "./feed-item-content";
// import FeedItemActions from "./feed-item-actions";
import {dateFormatter, numCommaFormatter} from "../../../util/formatter";

import styles from "./feed-item.module.css"

const FeedItem = ({ postData }) => {
    return (
        <div className={styles.feedItemContainer}>
            <FeedItemHeader owner={postData.owner} location={postData.location} />
            <FeedItemContent resourceArray={postData.resourceArray} isVideo={postData.isVideo} videoUrl={postData.videoUrl} isSidecar={postData.isSidecar} sidecarArray={postData.sidecarArray} />
            <FeedItemActions
                likes={postData.likes}
                viewerHasLiked={postData.viewerHasLiked}
                viewerHasSaved={postData.viewerHasSaved}
            />
            <MainPageComment feedDescription owner={postData.owner} text={postData.description} />
            <a className={styles.viewAllComments} onClick={() => Router.push("/p/[postShortcode]", `/p/${postData.shortcode}`)}>
                View all {numCommaFormatter(postData.commentsData.count)} comments
            </a>
            {postData.commentsData.commentsArray.map((el, index) => <MainPageComment key={index} {...el} />)}
            <a className={styles.itemDateText} href="#" >
                {dateFormatter(postData.createdAt)}
            </a>
            <FeedItemAddComment />
        </div>
    );
}

export default FeedItem
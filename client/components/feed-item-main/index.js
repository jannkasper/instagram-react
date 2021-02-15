import React from "react";
import FeedItemHeader from "./feed-item-header";
import FeedItemContent from "./feed-item-content";
import FeedItemActions from "./feed-item-actions";

import styles from "./feed-item-main.module.css"
import FeedItemAddComment from "./feed-item-add-comment";
import FeedItemComments from "./feed-item-comments";

const FeedItemMain = ({ postData }) => {

    return (
        <div className={styles.feedItemMainContainer}>
            <div className={styles.feedItemMainContent}>
                <FeedItemContent resourceArray={postData.resourceArray} />
            </div>
            <div className={styles.feedItemMainDescription}>
                <FeedItemHeader owner={postData.owner} location={postData.location}/>
                <FeedItemComments
                    commentsData={postData.commentsData}
                    owner={postData.owner}
                    text={postData.description}
                    createdAt={postData.createdAt}
                />
                <FeedItemActions
                    likes={postData.likes}
                    createdAt={postData.createdAt}
                    viewerHasLiked={postData.viewerHasLiked}
                    viewerHasSaved={postData.viewerHasSaved}
                />
                <FeedItemAddComment />
            </div>
        </div>
    );
}

export default FeedItemMain
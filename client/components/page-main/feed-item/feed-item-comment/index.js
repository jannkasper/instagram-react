import React, { useState } from "react";
import Link from "next/link";
import { hashtagFormatter } from "../../../../util/formatter";
import { Like } from "../../../icons";

import styles from "./feed-item-comment.module.css"

const MainPageComment = ({ feedDescription, owner, text }) => {
    const [showMore, setShowMore] = useState(false);

    const commentText = (!showMore && text.length > 120) ? text.slice(0, text.lastIndexOf(" ",120)) : text;

    return (
        <div className={styles.feedItemCommentContainer}>
            <div className={styles.commentContent}>
                <Link href="/[username]" as={`/${owner.username}`}>
                    <a className={styles.commentUserName}>{owner.username}</a>
                </Link>
                { hashtagFormatter(commentText) }
                {
                    (!showMore && text.length > 120) ?
                        <>... <span className={styles.showMore} onClick={() => setShowMore(true)}>more</span></> : null
                }
            </div>
            { feedDescription ? null :
                <div>
                    <Like/>
                </div>
            }
        </div>
    );
}

export default MainPageComment
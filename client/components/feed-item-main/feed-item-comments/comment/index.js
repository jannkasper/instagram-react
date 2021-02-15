import React, { useState } from "react";
import Link from "next/link";
import { Like } from "../../../icons";
import { bioFormatter, timeFormatter } from "../../../../util/formatter";

import styles from "./feed-item-comment.module.css";

const Comment = ({ feedDescription, owner, text, createdAt }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className={styles.commentContainer}>
            <div>
                <img className={styles.commentUserImage} src={owner.userImageUrl}/>
            </div>
            <div className={styles.commentContent}>
                <Link href="/[username]" as={`/${owner.username}`}>
                    <a className={styles.commentUserName}>{owner.username}</a>
                </Link>
                {bioFormatter(text)}
                <div className={styles.commentActions}>
                    <a className={styles.commentDate}>{timeFormatter(createdAt)}</a>
                    { feedDescription ? null :
                            <>
                                <button className={styles.commentButton}>1 like</button>
                                <button className={styles.commentButton}>Reply</button>
                            </>
                    }
                </div>
            </div>
            { feedDescription ? null :
                <div>
                    <Like/>
                </div>
            }
        </div>
    );
}

export default Comment
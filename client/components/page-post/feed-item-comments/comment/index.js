import React, { useState } from "react";
import Link from "next/link";
import {Like, Verified} from "../../../icons";
import { bioFormatter, timeFormatter, hashtagFormatter } from "../../../../util/formatter";

import styles from "./feed-item-comment.module.css";

const Comment = ({ feedDescription, owner, text, createdAt, likes }) => {
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
                {owner.isVerified ? <div className={styles.verifiedBandage}><Verified width={"15px"} height={"15px"} /></div> : null }
                {hashtagFormatter(text).map(item => {
                        if (item.startsWith('#')) {
                            return <a className={styles.hashHtml} href={`/explore/tags/${item.slice(1)}`} >{item}</a>
                        } else if (item.startsWith('@')) {
                            return <a className={styles.hashHtml} href={`/${item.slice(1)}`}>{item}</a>
                        } else if (item == "<br/>") {
                            return <br/>
                        } else {
                            return item;
                        }
                })}
                <div className={styles.commentActions}>
                    <a className={styles.commentDate}>{timeFormatter(createdAt)}</a>
                    { feedDescription ? null :
                            <>
                            { likes ? <button className={styles.commentButton}>{likes} like</button> : null}
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
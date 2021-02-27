import React from "react";
import Link from "next/link";
import cn from 'classnames'
import { Like, Verified } from "../../../icons";
import { timeFormatter, hashtagFormatter } from "../../../../util/formatter";

import styles from "./feed-item-comment.module.css";

const Comment = ({ feedDescription, owner, text, createdAt, likes }) => {

    return (
        <div className={styles.commentContainer}>
            <div>
                <img className={cn("imageAvatar", styles.avatarMargin)} src={owner.userImageUrl}/>
            </div>
            <div className={styles.commentContent}>
                <Link href="/[username]" as={`/${owner.username}`}>
                    <a className="label open">{owner.username}</a>
                </Link>
                &nbsp;{ owner.isVerified ? <Verified width={"15px"} height={"15px"} />: null }
                &nbsp;{ hashtagFormatter(text) }
                <div className={styles.commentActions}>
                    <a className="info grey">{timeFormatter(createdAt)}</a>
                    { feedDescription ? null :
                            <>
                            { likes ? <button className="info bold grey">{likes} like</button> : null}
                                <button className="info bold grey">Reply</button>
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
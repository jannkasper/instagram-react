import React, { useState } from "react";

import styles from "./feed-item-comment.module.css"
import {Like} from "../../../icons";

const Comment = ({ feedDescription }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className={styles.commentContainer}>
            <div>
                <img className={styles.commentUserImage} src="../../../../static/images/avatar1.png"/>
            </div>
            <div className={styles.commentContent}>
                <a className={styles.commentUserName}>partieangelique</a>
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                <div className={styles.commentActions}>
                    <a className={styles.commentDate}>3d</a>
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
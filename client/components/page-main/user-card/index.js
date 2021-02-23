import React from "react";

import styles from "./user-card.module.css";

const UserCard = () => {
    return (
        <div className={styles.userCardContainer}>
            <div className={styles.userImage}>
                <img src="../../../static/images/avatar1.png"/>
            </div>
            <div className={styles.userDetails}>
                <div className={styles.userName}>wilczynskarolina</div>
                <div className={styles.userFollowers}>Followed by react_user + 7 more</div>
            </div>
            <button className={styles.buttonFollow}>
                Follow
            </button>
        </div>
    )
}

export default UserCard
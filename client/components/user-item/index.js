import React from "react";
import UserItemHeader from "./user-item-header";

import styles from "./user-item.module.css"
import UserItemStories from "./user-item-stories";

const UserItem = () => {

    return (
        <div className={styles.userItemContainer}>
            <UserItemHeader />
            <UserItemStories />
        </div>
    );
}

export default UserItem
import React from "react";
import UserItemHeader from "./user-item-header";

import styles from "./user-item.module.css"
import UserItemStories from "./user-item-stories";

const UserItem = ({ userData }) => {

    return (
        <div className={styles.userItemContainer}>
            <UserItemHeader userData={userData} />
            {
                userData.storiesArray ? <UserItemStories storiesArray={userData.storiesArray} /> : null
            }
        </div>
    );
}

export default UserItem
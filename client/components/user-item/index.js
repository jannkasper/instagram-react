import React from "react";
import UserItemHeader from "./user-item-header";

import styles from "./user-item.module.css"
import UserItemStories from "./user-item-stories";

const UserItem = ({ userData }) => {

    const renderStories = () => {
        if (userData.storiesArray && userData.storiesArray.length) {
            return <UserItemStories storiesArray={userData.storiesArray} />
        }
    }

    return (
        <div className={styles.userItemContainer}>
            <UserItemHeader userData={userData} />
            {renderStories()}
        </div>
    );
}

export default UserItem
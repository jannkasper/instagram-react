import React from "react";
import StoriesItem from "./stories-item";

import styles from "./user-item-stories.module.css"

const UserItemStories = ({ storiesArray }) => {

    return (
        <div className={styles.userItemStoriesContainer}>
            <div className={styles.storiesContent}>
                <div className={styles.storiesSlider}>
                    { storiesArray.map((el, index) => <StoriesItem key={index} content={el} />)}
                </div>
            </div>

        </div>
    );
}

export default UserItemStories
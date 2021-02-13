import React from "react";

import styles from "./user-item-stories.module.css"
import StoriesItem from "./stories-item";

const UserItemStories = () => {

    return (
        <div className={styles.userItemStoriesContainer}>
            <div className={styles.storiesContent}>
                <div className={styles.storiesSlider}>
                    <StoriesItem />
                    <StoriesItem />
                    <StoriesItem />
                    <StoriesItem />
                    <StoriesItem />
                    <StoriesItem />
                    <StoriesItem />
                    <StoriesItem />
                    <StoriesItem />
                    <StoriesItem />
                    <StoriesItem />
                    <StoriesItem />
                    <StoriesItem />
                </div>
            </div>

        </div>
    );
}

export default UserItemStories
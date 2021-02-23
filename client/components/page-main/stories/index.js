import React from "react";

import styles from "./stories.module.css";
import StoriesItem from "./stories-item";

const Stories = () => {

    return (
        <div className={styles.storiesContainer}>
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
                </div>
            </div>
        </div>
    )
}

export default Stories
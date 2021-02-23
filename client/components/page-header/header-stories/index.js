import React from "react";
import StoriesItem from "./stories-item";

import styles from "./header-stories.module.css"

const HeaderStories = ({ storiesArray }) => {

    return (
        <div className={styles.headerStoriesContainer}>
            <div className={styles.storiesContent}>
                <div className={styles.storiesSlider}>
                    { storiesArray.map((el, index) => <StoriesItem key={index} content={el} />)}
                </div>
            </div>

        </div>
    );
}

export default HeaderStories
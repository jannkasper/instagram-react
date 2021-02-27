import React, { useEffect, useState } from "react";
import StoriesItem from "./stories-item";
import { publicFetch } from "../../../util/fetcher";

import styles from "./header-stories.module.css"

const HeaderStories = ({ username, userId }) => {

    const [storiesArray, setStoriesArray] = useState([]);

    useEffect(() => {
        publicFetch.get(`/users/${username}/stories`, { params: {userId: userId} }).then( response => {
            if (response.data.error) {
                // Router.push('/404')
            } else {
                Promise.resolve()
                    .then(() => setStoriesArray(response.data))
            }
        })
    },[username]);

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
import React, { useState } from "react";
import FeedGalleryTab from "../feed-gallery-tab";
import {Posts, Reels, Tagged, Tv} from "../../icons";

import styles from "./feed-gallery-tabs.module.css";

const FeedGalleryTabs = ({ setCurrentFeed }) => {
    const [selected, setSelected] = useState("timelineMedia");

    const handleSelect = (keyName) => {
        setCurrentFeed(keyName);
        setSelected(keyName);
    }

    return (
        <div className={styles.feedGalleryTabs}>
            <FeedGalleryTab keyName='timelineMedia' title='Posts' icon={<Posts/>} handleSelect={handleSelect} isSelected={'timelineMedia' === selected} />
            {/*<FeedGalleryTab keyName='reels' title='Reels' icon={<Reels/>} handleSelect={handleSelect} isSelected={'reels' === selected} />*/}
            {/*<FeedGalleryTab title='IgTv' icon={<Tv/>} handleSelect={handleSelect} isSelected={'IgTv' === selected}/>*/}
            <FeedGalleryTab keyName='tagged' title='Tagged' icon={<Tagged/>} handleSelect={handleSelect} isSelected={'tagged' === selected}/>
        </div>
    )
}

export default FeedGalleryTabs
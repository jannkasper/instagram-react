import React, { useState } from "react";
import FeedGalleryTab from "../feed-gallery-tab";
import { Posts, Tagged, Tv } from "../../icons";

import styles from "./feed-gallery-tabs.module.css";

const FeedGalleryTabs = () => {
    const [selected, setSelected] = useState("Posts");

    const handleSelect = (text) => {
        setSelected(text);
    }

    return (
        <div className={styles.feedGalleryTabs}>
            <FeedGalleryTab title='Posts' icon={<Posts/>} handleSelect={handleSelect} isSelected={'Posts' === selected} />
            {/*<FeedGalleryTab title='IgTv' icon={<Tv/>} handleSelect={handleSelect} isSelected={'IgTv' === selected}/>*/}
            <FeedGalleryTab title='Tagged' icon={<Tagged/>} handleSelect={handleSelect} isSelected={'Tagged' === selected}/>
        </div>
    )
}

export default FeedGalleryTabs
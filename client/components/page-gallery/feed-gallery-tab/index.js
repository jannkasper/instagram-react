import React from "react";

import styles from "./feed-gallery-tab.module.css";

const FeedGalleryTab = ({ title, keyName, icon, isSelected, handleSelect }) => {
    return (
            <span className={styles.feedGalleryTab} onClick={() => handleSelect(keyName)} style={{opacity: isSelected ? 1 : 0.5}}>
                {icon}
                <span className={styles.feedGalleryTab_title}>{title}</span>
            </span>
    )
}

export default FeedGalleryTab
import React from "react";
import {numCommaFormatter} from "../../util/formatter";

import styles from "./explore-header.module.css";


const ExploreHeader = ({ isTag, postCount, name, imageUrl}) => {

    const additionalInfo = () => {
        if (isTag) {
            return (
                <>
                    <div className={styles.headerInfoScore}>
                        <span className={styles.scoresName}><span className={styles.bold}>{numCommaFormatter(postCount)}</span> posts</span>
                    </div>
                    <button className={styles.buttonFollow}>Follow</button>
                </>
            )
        }
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerImage}>
                <img src={imageUrl}/>
            </div>
            <div className={styles.headerInfo}>
                <div className={styles.headerInfoName}>{isTag? '#' : ''}{name}</div>
                {additionalInfo()}
            </div>
        </header>
    )
}

export default ExploreHeader
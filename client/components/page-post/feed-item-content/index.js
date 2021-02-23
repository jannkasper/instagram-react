import React, { useState } from "react";

import styles from "./feed-item-content.module.css"
import {Muted, Sound} from "../../icons";

const FeedItemContent = ({ resourceArray, isVideo, videoUrl }) => {
    const [isMuted, setIsMuted] = useState(true);

    const handleClick = (e) => {
        e.preventDefault();
        setIsMuted(!isMuted);
    }

    return (
        <div className={styles.contentImage}>
            { isVideo ? (
                <>
                    <video autoPlay  loop muted={isMuted}>
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                    <div className={styles.contentSound} onClick={handleClick}>
                        {isMuted ? <Muted /> : <Sound /> }
                    </div>
                </>
            ) : (
                <img src={resourceArray[1].src}/>
            )}

        </div>
    );
}

export default FeedItemContent
import React, { useState } from "react";

import styles from "./feed-item-content.module.css"
import {Muted, Sound} from "../../icons";

const FeedItemContent = ({ resourceArray, isVideo, videoUrl, isSidecar, sidecarArray }) => {
    const [isMuted, setIsMuted] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleClick = (e) => {
        e.preventDefault();
        setIsMuted(!isMuted);
    }

    const handleNextSlide = () => {
        console.log(currentSlide + 1)
        setCurrentSlide(currentSlide + 1);

    }

    const handlePreviousSlide = () => {
        console.log(currentSlide - 1)
        setCurrentSlide(currentSlide - 1);
    }
    const Component = [];
    if (isVideo) {
        Component.push(
            <>
                <video autoPlay  loop muted={isMuted}>
                    <source src={videoUrl} type="video/mp4" />
                </video>
                <div className={styles.contentSound} onClick={handleClick}>
                    {isMuted ? <Muted /> : <Sound /> }
                </div>
            </>
        )
    } else if (isSidecar) {
        Component.push(
            <>
                { currentSlide > 0 ? (
                    <>
                        <button className={styles.previousSlide} onClick={handlePreviousSlide}>
                        <div className={styles.previousSlideIcon}/>
                        </button>
                        <img className={styles.previousSlideImage} src={sidecarArray[currentSlide-1].resourceArray[1].src}/>
                    </>
                ) : null }
                <img className={styles.main} src={sidecarArray[currentSlide].resourceArray[1].src}/>
                { currentSlide < sidecarArray.length - 1 ? (
                    <>
                        <img className={styles.nextSlideImage} src={sidecarArray[currentSlide+1].resourceArray[1].src}/>
                        <button className={styles.nextSlide} onClick={handleNextSlide}>
                            <div className={styles.nextSlideIcon}/>
                        </button>
                    </>
                ) : null }
            </>
        )
    } else {
        Component.push(
            <img className={styles.main} src={resourceArray[1].src}/>
        )
    }

    return (
        <div className={styles.contentImage}>
            { Component }
        </div>
    );
}

export default FeedItemContent
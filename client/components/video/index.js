import React, {useEffect, useState} from "react";
import { Muted, Sound } from "../icons";

import styles from "./video.module.css";
import {fetchImage} from "../../util/context";

export default function Video ({
    src,
}) {
    const [isMuted, setIsMuted] = useState(true);
    const [imageBase64, setImageBase64] = useState(null);

    useEffect( () => {
        fetchImage(setImageBase64, src);
    }, [src])

    const handleClick = (e) => {
        e.preventDefault();
        setIsMuted(!isMuted);
    }

    if (!imageBase64) {
        return <></>
    }

    return (
        <>
            <video
                autoPlay
                loop
                muted={isMuted}
                style={{
                    maxWidth: "inherit",
                    height: "inherit",
                    left: 0,
                    top: 0,
                    objectFit: "cover"
                }}
            >
                <source src={imageBase64} type="video/mp4" />
            </video>
            <div className={styles.iconBackground} onClick={handleClick}>
                {isMuted ? <Muted /> : <Sound /> }
            </div>
        </>
    );
}

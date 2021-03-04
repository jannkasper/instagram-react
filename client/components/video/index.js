import React, {useState} from "react";
import { Muted, Sound } from "../icons";

import styles from "./video.module.css";

export default function Video ({
    src,
}) {
    const [isMuted, setIsMuted] = useState(true);

    const handleClick = (e) => {
        e.preventDefault();
        setIsMuted(!isMuted);
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
                <source src={src} type="video/mp4" />
            </video>
            <div className={styles.iconBackground} onClick={handleClick}>
                {isMuted ? <Muted /> : <Sound /> }
            </div>
        </>
    );
}

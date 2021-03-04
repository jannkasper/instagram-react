import React, { useState } from "react";
import cn from "classnames";
import Button from "../button";
import { DynamicIcon } from "../icons";

import styles from "./sidecar.module.css";

export default function Sidecar ({
    imageArray,
}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const handleNextSlide = () => { setCurrentSlide(currentSlide + 1);}
    const handlePreviousSlide = () => { setCurrentSlide(currentSlide - 1);}

    return (
        <>
            { currentSlide > 0 ? (
                <Button className={cn(styles.position, styles.left)} onClick={handlePreviousSlide}>
                    <DynamicIcon type="previous" iconSize={30} />
                </Button>
            ) : null }
            { currentSlide < imageArray.length - 1 ? (
                <Button className={cn(styles.position, styles.right)} onClick={handleNextSlide}>
                    <DynamicIcon type="next" iconSize={30} />
                </Button>
            ) : null }
            <img
                src={imageArray[currentSlide].resourceArray[1].src}
                style={{
                    maxWidth: "inherit",
                    height: "inherit",
                    left: 0,
                    top: 0,
                    objectFit: "cover"
                }}
            />
        </>
    );
}

import React, { useState } from "react";
import cn from "classnames";
import Button from "../button";
import { DynamicIcon } from "../icons";

import styles from "./sidecar.module.css";
import Image from "../image";

export default function Sidecar ({
    imageArray,
}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const handleNextSlide = () => { setCurrentSlide(currentSlide + 1);}
    const handlePreviousSlide = () => { setCurrentSlide(currentSlide - 1);}

    return (
        <>
            <Image src={imageArray[currentSlide].resourceArray[1].src} />
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
            </>
    );
}

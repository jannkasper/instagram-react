import React from "react";
import {Camera} from "../../icons";

import styles from "./empty-gallery.module.css";
import {Label} from "../../text";

const EmptyGallery = () => {
    return (
        <>
            <div className={styles.feedGalleryEmpty_icon}>
                <Camera />
            </div>
            <Label
                size={28}
                height={32}
                weight={300}
                additionalStyle={{margin: "32px auto"}}
            >
                No Photos
            </Label>
        </>
    )
}

export default EmptyGallery

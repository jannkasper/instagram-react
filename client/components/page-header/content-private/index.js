import React from "react";

import styles from "./content-private.module.css"

const ContentPrivate = () => {

    return (
        <div className={styles.contentPrivateContainer}>
            <div className={styles.contentPrivateBox}>
                <div className={styles.privateHeader}>This Account is Private</div>
                <div>Follow to see their photos and videos.</div>
            </div>
        </div>
    );
}

export default ContentPrivate
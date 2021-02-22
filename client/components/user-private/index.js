import React from "react";

import styles from "./user-private.module.css"

const UserPrivate = () => {

    return (
        <div className={styles.userPrivateContainer}>
            <div className={styles.userPrivateBox}>
                <div className={styles.privateHeader}>This Account is Private</div>
                <div>Follow to see their photos and videos.</div>
            </div>
        </div>
    );
}

export default UserPrivate
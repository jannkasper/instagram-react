import React from "react";
import {Activity, Explore, HomeActive, Message} from "../../icons";

import styles from "./layout-header-icon-group.module.css";

const IconGroup = () => {
    return (
        <div className={styles.iconGroupContainer}>
            <HomeActive className={styles.icon}/>
            <Message className={styles.icon} />
            <Explore className={styles.icon} />
            <Activity className={styles.icon} />
            <img className={[styles.icon, styles.avatar].join(" ")} src="../../../static/images/avatar1.png" />
        </div>
    )
}

export default IconGroup
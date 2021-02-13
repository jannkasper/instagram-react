import React from "react";

import styles from "./header.module.css";
import HomeIcon from "../../icons/HomeIcon";
import {Activity, Explore, Home, HomeActive, Message, Search} from "../../icons";

const Header = ({ className, ...props}) => {

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.headerLogo}>
                    <img src="../../../static/images/logo.png" />
                </div>
                <div className={styles.headerSearch}>
                    <input placeholder="Szukaj"/>
                    <Search className={styles.headerSearchIcon} color="#8e8e8e" />
                </div>
                <div className={styles.headerIconGroup}>
                    <HomeActive className={styles.headerIcon}/>
                    <Message className={styles.headerIcon} />
                    <Explore className={styles.headerIcon} />
                    <Activity className={styles.headerIcon} />
                    <img className={[styles.headerIcon, styles.headerUserAvatar].join(" ")} src="../../../static/images/avatar1.png" />
                </div>
            </div>
        </div>
    )
}

export default Header
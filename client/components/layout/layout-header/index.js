import React from "react";
import Search from "../layout-header-search";
import IconGroup from "../layout-header-icon-group";

import styles from "./layout-header.module.css";

const Header = () => {

    return (
        <div className={styles.headerContainer} >
            <div className={styles.headerContent}>
                <div className={styles.headerLogo}>
                    <img src="../../../static/images/logo.png" />
                </div>
                <Search />
                <IconGroup />
            </div>
        </div>
    )
}

export default Header
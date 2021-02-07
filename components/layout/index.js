import React from "react";
import Header from "./header";
import Main from "./main";

import styles from "./layout.module.css";

const Layout = ({children}) => {

    return (
        <div>
            <Header />
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}

export default Layout
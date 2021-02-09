import React from "react";
import Header from "./header";

import styles from "./layout.module.css";
import Sidebar from "./sidebar";

const Layout = ({children}) => {

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.mainContent} >
                    {children}
                </div>
                <Sidebar />
            </div>
        </div>
    )
}

export default Layout
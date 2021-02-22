import React from "react";
import Header from "./header";

import styles from "./layout.module.css";

const Layout = ({children}) => {

    return (
        <>
            <Header />
            <main className={styles.mainContainer}>
                {children}
            </main>
        </>
    )
}

export default Layout
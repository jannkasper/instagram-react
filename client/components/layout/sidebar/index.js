import React from "react";

import styles from "./sidebar.module.css";
import UserCard from "../../user-card";

const Sidebar = ({children}) => {

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.fixedContent}>

                <div className={styles.sidebarUser}>
                    <div className={styles.userImage}>
                        <img src="../../../static/images/avatar1.png"/>
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.userName}>jann.kasper</div>
                        <div className={styles.userDescription}>Jan Kasper | Utrecht</div>
                    </div>
                </div>

                <div className={styles.sidebarContacts}>
                    <div className={styles.contactsHeader}>
                        <div className={styles.headerTitle}>Suggestions For You</div>
                        <div className={styles.seeAll}>See all</div>
                    </div>
                    <div className={styles.contacts}>
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.subPages}>
                        <div className={styles.pageTitle}>About</div>
                        <div className={styles.pageTitle}>Help</div>
                        <div className={styles.pageTitle}>Press</div>
                        <div className={styles.pageTitle}>API</div>
                        <div className={styles.pageTitle}>Jobs</div>
                        <div className={styles.pageTitle}>Privacy</div>
                        <div className={styles.pageTitle}>Terms</div>
                        <div className={styles.pageTitle}>Locations</div>
                        <div className={styles.pageTitle}>Top Accounts</div>
                        <div className={styles.pageTitle}>Hashtags</div>
                        <div className={styles.pageTitle}>Language</div>

                    </div>
                    © 2021 INSTAGRAM FROM JANN.KASPER
                </div>
            </div>
        </div>
    )
}

export default Sidebar
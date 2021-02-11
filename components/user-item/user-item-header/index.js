import React from "react";

import styles from "./user-item-header.module.css"
import {More} from "../../icons";

const UserItemHeader = () => {

    return (
        <div className={styles.userItemHeaderContainer}>
            <div className={styles.userImageContainer}>
                <div className={styles.userImage}>
                    <img src="../../../static/images/avatar1.png"/>
                </div>
            </div>
            <div className={styles.userDetails}>
                <div className={styles.user1Line}>
                    <h2 className={styles.userName}>dogs.lovers</h2>
                    <div className={styles.userButtonGroup}>
                        <button className={styles.buttonFollow}>Follow</button>
                        {/*<button>Q^</button>*/}
                        <button className={styles.buttonMore}><div className={styles.triangle}></div></button>
                    </div>
                    <More height={24} width={24} />
                </div>
                <div className={styles.user2Line}>
                    <span className={styles.userScore}><span className={styles.bold}>500</span> posts</span>
                    <span className={styles.userScore}><span className={styles.bold}>50k</span> followers</span>
                    <span className={styles.userScore}><span className={styles.bold}>150</span> following</span>
                </div>
                <div className={styles.user3Line}>
                    <span className={styles.descriptionHeader}>DAMIAN OLSZEWSKI | CZYSTY ZYSK</span>
                    <span>
                        💼 Inwestor, Finansista, Edukator
                        <br/>
                        💹 Inwestycje w nieruchomości i biznes
                        <br/>
                        🎥 Youtube 96K SUBS 🎥
                    </span>
                    <span className={styles.descriptionFollowed}>
                        {"Followed by "}
                        <a className={styles.followedUserName}>skoczylas_paulina</a>
                        {" and "}
                        <a className={styles.followedUserName}>joaaaskaaa</a>

                    </span>
                </div>
            </div>
        </div>
    );
}

export default UserItemHeader
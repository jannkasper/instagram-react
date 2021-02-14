import React from "react";

import styles from "./user-item-header.module.css"
import {More, Verified} from "../../icons";
import {numFormatter, urlFormatter, bioFormatter} from "../../../util/formatter";

const UserItemHeader = ({ userData }) => {
    return (
        <div className={styles.userItemHeaderContainer}>
            <div className={styles.userImageContainer}>
                <div className={styles.userImage}>
                    <img src={userData.userImageUrl}/>
                </div>
            </div>
            <div className={styles.userDetails}>
                <div className={styles.user1Line}>
                    <h2 className={styles.userName}>{userData.username}</h2>
                    {userData.isVerified ? <div className={styles.verifiedBandage}><Verified /></div> : null }
                    <div className={styles.userButtonGroup}>
                        <button className={styles.buttonFollow}>Follow</button>
                        {/*<button>Q^</button>*/}
                        <button className={styles.buttonMore}><div className={styles.triangle}></div></button>
                    </div>
                    <More height={24} width={24} />
                </div>
                <div className={styles.user2Line}>
                    <span className={styles.userScore}><span className={styles.bold}>{userData.postCount}</span> posts</span>
                    <span className={styles.userScore}><span className={styles.bold}>{numFormatter(userData.followersCount)}</span> followers</span>
                    <span className={styles.userScore}><span className={styles.bold}>{numFormatter(userData.followingsCount)}</span> following</span>
                </div>
                <div className={styles.user3Line}>
                    <span className={styles.descriptionHeader}>{userData.name}</span>
                    <span>{bioFormatter(userData.bio)}</span>
                    {userData.bioUrlName ? <a className={styles.bioUrl} href={userData.bioUrl} target="_blank">{urlFormatter(userData.bioUrlName)}</a> : null }
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
import React from "react";
import Link from 'next/link'
import { More, Verified } from "../../icons";
import { numFormatter, urlFormatter, bioFormatter } from "../../../util/formatter";

import styles from "./user-item-header.module.css"

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
                    { userData.bioUrlName ? <a className={styles.bioUrl} href={userData.bioUrl} target="_blank">{urlFormatter(userData.bioUrlName)}</a> : null }
                    { userData.mutualFollow ?
                            <span className={styles.descriptionFollowed}>
                                {"Followed by "}
                                {userData.mutualFollow.usernameArray.map((username, index) =>
                                    <>
                                        <span className={styles.followedUserName}>
                                            <Link key={index} className={styles.followedUserName} href="/[username]" as={`/${username}`}>
                                            {username}
                                            </Link>
                                        </span>
                                        {index < userData.mutualFollow.usernameArray.length-1 ? ", " : " "}
                                    </>)}
                                {userData.mutualFollow.count - userData.mutualFollow.usernameArray.length > 0 ? `+${userData.mutualFollow.count - userData.mutualFollow.usernameArray.length} more` : null}
                            </span>
                            : null
                    }
                </div>
            </div>
        </div>
    );
}

export default UserItemHeader
import React from "react";

import styles from "./feed-item-header.module.css"
import {More, Verified} from "../../icons";
import Link from "next/link";

const FeedItemHeader = ({ owner, location }) => {

    return (
        <div className={styles.header}>
            <img className="imageAvatar" src={owner.userImageUrl}/>
            <div className={styles.headerText}>
                <Link href="/[username]" as={`/${owner.username}`}>
                    <span className="label open">
                        {owner.username}&nbsp;{owner.isVerified ? <Verified width={"15px"} height={"15px"} /> : null }
                    </span>
                </Link>
                <div className="info">{location}</div>
            </div>
            <div className="auto-right">
                <More />
            </div>
        </div>
    );
}

export default FeedItemHeader
import React from "react";

import styles from "./feed-item-header.module.css"
import {More, Verified} from "../../icons";
import Link from "next/link";
import Button from "../../button";

const FeedItemHeader = ({ owner, location }) => {

    return (
        <div className={styles.header}>
            <img className="imageAvatar" src={owner.userImageUrl}/>
            <div className={styles.headerText}>
                <Button
                    className="label open"
                    href={`/${owner.username}`}
                >
                    {owner.username}&nbsp;
                    {owner.isVerified ? <Verified width={"15px"} height={"15px"} /> : null }
                </Button>
                <div className="info">{location}</div>
            </div>
            <div className="auto-right">
                <More />
            </div>
        </div>
    );
}

export default FeedItemHeader
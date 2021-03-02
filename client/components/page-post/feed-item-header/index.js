import React from "react";

import styles from "./feed-item-header.module.css"
import {More, Verified} from "../../icons";
import Link from "next/link";
import Button from "../../button";
import {Info, Label} from "../../Text";
import Avatar from "../../avatar";

const FeedItemHeader = ({ owner, location }) => {

    return (
        <div className={styles.container}>
            <Avatar src={owner.userImageUrl} size={32} />
            <div className={styles.textWrapper}>
                <Button href={`/${owner.username}`}>
                    <Label verified={owner.isVerified}>
                        {owner.username}
                    </Label>
                </Button>
                <Info>
                    {location}
                </Info>
            </div>
            <div style={{ marginLeft: "auto "}}>
                <More />
            </div>
        </div>
    );
}

export default FeedItemHeader
import React from "react";
import Avatar from "../../../avatar";
import { DynamicIcon } from "../../../icons";
import { Label, Info } from "../../../text";
import { numCommaFormatter } from "../../../../util/formatter";

import styles from "./item.module.css";

const Item = ({ item }) => {

    const determineHref = () => {
        if (item.user) {
            return `/${item.username}`;
        } else if (item.hashtag) {
            return `/explore/tags/${item.name}`;
        } else if (item.place) {
            return `/explore/locations/${item.id}/${item.slug}`;
        }
        return "";
    }

    return (
        <div className={styles.container}>
            <a href={ determineHref() } >
                <div className={styles.flexContainer}>
                    { item.imageUrl ? <Avatar src={item.imageUrl} size={44} border={50} />
                        : <DynamicIcon type="location" size={44} border />
                    }
                    <div className={styles.details}>
                        <Label verified={item.isVerified}>
                            {item.hashtag ? `#${item.name}` : item.name}
                        </Label>
                        <Info size={14} color="#8e8e8e">
                            { item.description || (item.hashtag && numCommaFormatter(item.postCount) + ' posts') }
                        </Info>
                    </div>
                </div>
            </a>
        </div>

    )
}

export default Item
import React from "react";
import { useRouter } from 'next/router'
import { Location, Verified as VerifiedIcon } from "../../icons";
import { numCommaFormatter } from "../../../util/formatter";

import styles from "./item.module.css";

const Item = ({item, handleChangeValue}) => {
    const router = useRouter()

    const Verified = item && item.isVerified && (
        <div className={styles.searchResultItem_verified}>
            <VerifiedIcon width={"13px"} height={"13px"} />
        </div>
    )

    const determineDescription = () => {
        if (item.hashtag) {
            return <div className={styles.searchResultItem_description}>{numCommaFormatter(item.postCount) + ' posts'}</div>
        } else if (item.description) {
            return <div className={styles.searchResultItem_description}>{item.description}</div>
        }
    }

    const determineImage = () => {
        if (item.imageUrl) {
            return <img src={item.imageUrl}/>
        } else if (item.place) {
            return <Location />
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        handleChangeValue('');
        if (item.user) {
            router.replace(`/${item.username}`)
        } else if (item.hashtag) {
            router.replace(`/explore/tags/${item.name}`)
        } else if (item.place) {
            router.replace(`/explore/locations/${item.id}/${item.slug}`)
        }
    }

    return (
        <div className={styles.searchResultItemContainer}>
            <a href={item.name} onClick={handleClick}>
                <div className={styles.searchResultItem_content}>
                    <div className={styles.searchResultItem_image}>
                        { determineImage() }
                    </div>
                    <div className={styles.searchResultItem_text}>
                        <div className="label">
                            {item.hashtag ? '#':''}{item.name}{Verified}
                        </div>
                        { determineDescription() }
                    </div>
                </div>
            </a>
        </div>

    )
}

export default Item
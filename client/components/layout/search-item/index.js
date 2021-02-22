import React from "react";
import { useRouter } from 'next/router'

import {Location, Verified} from "../../icons";

import styles from "./search-item.module.css";
import {numCommaFormatter} from "../../../util/formatter";

const SearchItem = ({item, handleChangeValue}) => {
    const router = useRouter()
    const verifiedUser = () => {
        if (item && item.isVerified) {
            return (
                <div className={styles.verified}>
                    <Verified width={"13px"} height={"13px"} />
                </div>
            )}
    }

    const determineDescription = () => {
        if (item.hashtag) {
            return <div className={styles.description}>{numCommaFormatter(item.postCount) + ' posts'}</div>
        } else if (item.description) {
            return <div className={styles.description}>{item.description}</div>
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
        <div className={styles.searchItemContainer}>
            <a href={item.name} onClick={handleClick}>
                <div className={styles.searchItemContent}>
                    <div className={styles.searchItemImage}>
                        {determineImage()}
                    </div>
                    <div className={styles.text}>
                        <div className={styles.username}>
                            {item.hashtag ? '#':''}{item.name}{verifiedUser()}
                        </div>
                        {determineDescription()}
                    </div>
                </div>
            </a>
        </div>

    )
}

export default SearchItem
import React from "react";
import { useRouter } from 'next/router'

import { Verified } from "../../icons";

import styles from "./search-item.module.css";

const SearchItem = ({position, user, handleChangeValue}) => {
    const router = useRouter()
    const verifiedUser = () => {
        if (user && user.is_verified) {
            return (
                <div className={styles.verified}>
                    <Verified width={"13px"} height={"13px"} />
                </div>
            )}
    }

    const handleClick = (e) => {
        e.preventDefault();
        handleChangeValue('');
        router.push(`/${user.username}`)
    }

    return (
        <div className={styles.searchItemContainer}>
            <a href={user.username} onClick={handleClick}>
                <div className={styles.searchItemContent}>
                    <div className={styles.searchItemImage}>
                        <img src={user.profile_pic_url}/>
                    </div>
                    <div className={styles.text}>
                        <div className={styles.username}>
                            {user.username}
                            {verifiedUser()}
                        </div>
                        <div className={styles.description}>{user.full_name}</div>
                    </div>
                </div>
            </a>
        </div>

    )
}

export default SearchItem
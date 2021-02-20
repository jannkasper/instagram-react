import React from "react";

import styles from "./search-item.module.css";
import {Verified} from "../../icons";

const SearchItem = () => {



    return (
        <div className={styles.searchItemContainer}>
            <div className={styles.searchItemContent}>
                <div className={styles.searchItemImage}>
                    <img src="../../../static/images/avatar1.png"/>
                </div>
                <div className={styles.text}>
                    <div className={styles.username}>
                        {'banksy'}
                        <div className={styles.verified}>
                            <Verified width={"13px"} height={"13px"} />
                        </div>
                    </div>
                    <div className={styles.description}>Banksy </div>
                </div>
            </div>
            </div>
    )
}

export default SearchItem
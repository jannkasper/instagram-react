import React, { useState } from "react";

import styles from "./header.module.css";
import HomeIcon from "../../icons/HomeIcon";
import {Activity, Explore, Home, HomeActive, Message, Search} from "../../icons";
import StoriesItem from "../../stories/stories-item";
import SearchItem from "../search-item";
import UserCard from "../../user-card";

const Header = ({ className, ...props}) => {

    const [searchValue, setSearchValue] = useState('');


    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.headerLogo}>
                    <img src="../../../static/images/logo.png" />
                </div>
                <div className={styles.headerSearch}>
                    <input placeholder="Szukaj" onChange={e => setSearchValue(e.target.value)} />
                    <Search className={styles.headerSearchIcon} color="#8e8e8e" />
                    <div className={styles.storiesContainer} style={{visibility: searchValue ? "visible" : "hidden"}}>
                        <div className={styles.triangle}/>
                        <div className={styles.storiesContent}>
                            <div className={styles.storiesSlider}>
                                <SearchItem /><SearchItem /><SearchItem />
                                <SearchItem /><SearchItem /><SearchItem />
                                <SearchItem /><SearchItem /><SearchItem />
                                <SearchItem /><SearchItem /><SearchItem />
                                <SearchItem /><SearchItem /><SearchItem />
                                <SearchItem /><SearchItem /><SearchItem />
                                <SearchItem /><SearchItem /><SearchItem />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.headerIconGroup}>
                    <HomeActive className={styles.headerIcon}/>
                    <Message className={styles.headerIcon} />
                    <Explore className={styles.headerIcon} />
                    <Activity className={styles.headerIcon} />
                    <img className={[styles.headerIcon, styles.headerUserAvatar].join(" ")} src="../../../static/images/avatar1.png" />
                </div>
            </div>
        </div>
    )
}

export default Header
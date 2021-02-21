import React, {useEffect, useRef, useState} from "react";

import styles from "./header.module.css";
import HomeIcon from "../../icons/HomeIcon";
import {Activity, Explore, Home, HomeActive, Message, Search} from "../../icons";
import StoriesItem from "../../stories/stories-item";
import SearchItem from "../search-item";
import UserCard from "../../user-card";
import {publicFetch} from "../../../util/fetcher";

const Header = ({ className, ...props}) => {
    const wrapperRef = useRef(null);

    const [onFocused, setOnFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect( () => {
        const fetchSearchResult = async () => {
            const { data } = await publicFetch.get(`/search/${searchValue}`)
            if (!data.hasError) {
                setSearchResult(data);
            }
        }
        if (searchValue && searchValue.length > 1) {
            fetchSearchResult();
        }
    }, [searchValue]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOnFocused(false)
                // alert("You clicked outside of me!");
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    function handleChangeValue(newValue) {
        setTimeout(() => setSearchValue(newValue), 2000);

    }



    return (
        <div className={styles.headerContainer} >
            <div className={styles.headerContent}>
                <div className={styles.headerLogo}>
                    <img src="../../../static/images/logo.png" />
                </div>
                <div ref={wrapperRef} className={styles.headerSearch}>
                    <input placeholder="Szukaj" value={searchValue} onChange={e => setSearchValue(e.target.value)} onFocus={() => setOnFocused(true)}/>
                    <Search className={styles.headerSearchIcon} color="#8e8e8e" />
                    <div className={styles.storiesContainer} style={{visibility:  onFocused && searchValue && searchResult.length > 0 ? "visible" : "hidden"}}>
                        <div className={styles.triangle}/>
                        <div className={styles.storiesContent}>
                            <div className={styles.storiesSlider} >
                                { searchResult.map((item, index) => <SearchItem key={index} item={item} handleChangeValue={handleChangeValue}/>)}

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
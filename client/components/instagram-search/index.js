import React from "react";
import Wrapper from "../wrapper";
import Input from "../input";
import SearchResult from "./search-result";
import {Search} from "../icons";
import searchInstagramHook from "../../hooks/search-hook";

import styles from "./search-instagram.module.css";

const InstagramSearch = () => {
    const {
        searchContainerRef,
        searchResult,
        searchValue,
        setSearchValue,
        onFocused,
        setOnFocused
    } = searchInstagramHook()

    return (
        <Wrapper
            reference={searchContainerRef}
            height="28px"
            width="215px"
            minWidth="125px"
        >
            <Input
                value={searchValue}
                handleChange={e => setSearchValue(e.target.value)}
                handleFocus={() => setOnFocused(true)}
                height="100%"
                width="100%"
                border="solid 1px #dbdbdb"
                borderRadius="3px"
                backgroundColor="#fafafa"
                padding="3px 10px 3px 26px"
            >
                <Search className={styles.inputIcon} color="#8e8e8e" />
            </Input>
            <SearchResult
                searchResult={searchResult}
                visible={onFocused && searchValue && searchResult.length > 0}
                setSearchValue={setSearchValue}
            />
        </Wrapper>
    )
}

export default InstagramSearch
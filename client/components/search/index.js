import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import SearchInput from "./search-input";
import SearchResult from "./search-result";
import { publicFetch } from "../../util/fetcher";

import styles from "./search.module.css";

const Search = () => {
    const searchContainerRef = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [onFocused, setOnFocused] = useState(false);

    useEffect( () => {
        if (searchValue && searchValue.length > 1) {
            publicFetch.get(`/search/${searchValue}`).then( response => {
                if (response.data.error) {
                    Router.push('/404')
                } else {
                    setSearchResult(response.data);
                }
            })
        }
    }, [searchValue]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setOnFocused(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchContainerRef]);

    return (
        <div ref={searchContainerRef} className={styles.container}>
            <SearchInput
                value={searchValue}
                setValue={setSearchValue}
                setOnFocused={setOnFocused}
            />
            <SearchResult
                searchResult={searchResult}
                visible={onFocused && searchValue && searchResult.length > 0}
                setSearchValue={setSearchValue}
            />
        </div>
    )
}

export default Search
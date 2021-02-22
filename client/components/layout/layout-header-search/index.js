import React, { useEffect, useRef, useState } from "react";
import SearchResult from "../layout-header-search-result";
import { Search as SearchIcon } from "../../icons";
import { publicFetch } from "../../../util/fetcher";

import styles from "./layout-header-search.module.css";

const Search = () => {
    const searchContainerRef = useRef(null);

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [onFocused, setOnFocused] = useState(false);

    useEffect( () => {
        if (searchValue && searchValue.length > 1) {
            publicFetch.get(`/search/${searchValue}`).then( response => {
                if (!response.data.hasError) {
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

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchContainerRef]);

    return (
        <div ref={searchContainerRef} className={styles.searchContainer}>
            <input placeholder="Search" value={searchValue} onChange={e => setSearchValue(e.target.value)} onFocus={() => setOnFocused(true)}/>
            <SearchIcon className={styles.searchIcon} color="#8e8e8e" />
            <SearchResult searchResult={searchResult} visible={onFocused && searchValue && searchResult.length > 0} setSearchValue={setSearchValue} />
        </div>
    )
}

export default Search
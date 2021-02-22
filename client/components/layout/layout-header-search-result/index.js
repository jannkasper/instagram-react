import React from "react";
import SearchResultItem from "../layout-header-search-result-item";

import styles from "./layout-header-search-result.module.css";

const SearchResult = ({ searchResult, visible, setSearchValue}) => {

    function handleChangeValue(newValue) {
        setTimeout(() => setSearchValue(newValue), 2000);
    }

    return (
        <div className={[styles.searchResultContainer, visible && styles.searchResultVisible].join(' ')}>
            <div className={styles.searchResult_shape} />
            <div className={styles.searchResult_content}>
                <div className={styles.searchResult_slider} >
                    { searchResult.map((item, index) => <SearchResultItem key={index} item={item} handleChangeValue={handleChangeValue} />)}
                </div>
            </div>
        </div>
    )
}

export default SearchResult
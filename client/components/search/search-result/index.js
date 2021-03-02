import React from "react";
import Item from "./item";

import styles from "./search-result.module.css"

export default function SearchResult ({ searchResult, visible, setSearchValue}) {
    function handleChangeValue(newValue) {
        setTimeout(() => setSearchValue(newValue), 2000);
    }

    return (
        <div className={[styles.container, visible && styles.visibility].join(' ')}>
            <div className={styles.triangle_shape} />
            <div className={styles.content}>
                <div className={styles.scrollable}>
                    { searchResult.map((item, index) => <Item key={index} item={item} handleChangeValue={handleChangeValue} />)}
                </div>
            </div>
        </div>
    )
}
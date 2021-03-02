import React from "react";
import { Search } from "../../icons";

import styles from "./search-input.module.css";

export default function SearchInput ({value, setValue, setOnFocused}) {
    return (
        <>
            <input
                className={styles.input}
                placeholder="Search"
                value={value}
                onChange={e => setValue(e.target.value)}
                onFocus={() => setOnFocused(true)}
            />
            <Search className={styles.inputIcon} color="#8e8e8e" />
        </>
    )
}
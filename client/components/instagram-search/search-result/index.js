import React from "react";
import Item from "./item";
import ScrollWrapper from "../../scroll-wrapper";

import styles from "./search-result.module.css"

export default function SearchResult ({ searchResult, visible, setSearchValue}) {
    function handleChangeValue(newValue) {
        setTimeout(() => setSearchValue(newValue), 2000);
    }

    return (
        <div className={[styles.container, visible && styles.visibility].join(' ')}>
            <div className={styles.triangle_shape} />
            <ScrollWrapper
                alignItems="center"
                height="362px"
                width="100%"
                border="1px solid #dbdbdb"
                borderRadius="6px"
                background="#fff"
                contentWidth="100%"
                contentPadding="12px 0 0 0"
            >
                { searchResult.map((item, index) =>
                    <Item
                        key={index}
                        item={item}
                        handleChangeValue={handleChangeValue}
                    />
                )}
            </ScrollWrapper>
        </div>
    )
}
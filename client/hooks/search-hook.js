import React, { useRef, useState, useEffect } from "react";
import {publicFetch} from "../util/fetcher";
import Router from "next/router";

function searchInstagramHook() {
    const searchContainerRef = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [onFocused, setOnFocused] = useState(false);

    useEffect(() => {
        if (searchValue && searchValue.length > 1) {
            publicFetch.get(`/search/${searchValue}`).then(response => {
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

    return { searchContainerRef, searchResult, searchValue, setSearchValue, onFocused, setOnFocused }
}

export default searchInstagramHook
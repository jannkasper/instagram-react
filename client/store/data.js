import React, { createContext, useState, useEffect } from 'react'
import Router from "next/router";
import { publicFetch } from "../util/fetcher";


const DataContext = createContext();
const { Provider } = DataContext;

const DataProvider = ({ children }) => {
    const [dataState, setDataState] = useState(null);
    const [extraDataState, setExtraDataState] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect( () => {
        if (!children.props.fetchURL) {
            return
        }
        publicFetch.get(children.props.fetchURL).then( response => {
            if (response.data.error) {
                Router.push('/404')
            } else {
                setDataState(response.data);
            }
        })
    }, [children.props.fetchURL]);

    const triggerExtraData = (url, params) => {
        publicFetch.get(url, { params }).then( response => {
            setDataState(...dataState);
        });
    }

    const triggerLoadData = (url, params) => {
        if (isFetching) {
            return
        }
        setIsFetching(true);
        publicFetch.get(url, { params }).then( response => {
            setDataState({
                ...dataState,
                timelineMedia: { pageInfo: response.data.pageInfo, mediaArray: dataState.timelineMedia.mediaArray.concat(response.data.mediaArray) }
            })
        }).then(() => setIsFetching(false));
    }

    return <Provider value={{ dataState, extraDataState, triggerExtraData, triggerLoadData }}>{children}</Provider>

}

export { DataContext, DataProvider }

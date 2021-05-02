import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Instagram } from "../components/icons";
import Post from "../components/post";
import {fetchState} from "../util/context";

export default function Home() {
    const [dataState, setDataState] = useState(null);

    useEffect(() => {
        fetchState(setDataState,"/posts")
    }, [])

    if (dataState) {
        return (
            <Layout>
                {dataState.postArray.map((item, index) => <Post key={index} post={item} />)}
            </Layout>
        )
    } else {
        return <Instagram />

    }
};

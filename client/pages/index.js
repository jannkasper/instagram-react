import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Instagram } from "../components/icons";
import Post from "../components/post";
import {fetchState} from "../util/context";

export default function Home() {
    const [dataState, setDataState] = useState(null);

    useEffect(() => {
        fetchState(setDataState,"/posts")
    })

    return (dataState ?
            <Layout>
                {dataState.postArray.map(item => <Post post={item} />)}
            </Layout>
            :
            <Instagram />
    )
};
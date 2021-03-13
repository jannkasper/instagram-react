import React, {useEffect, useState} from "react";
import Layout from "../../components/layout";
import InstagramPost from "../../components/instagram-post";
import { Instagram } from "../../components/icons";
import InstagramGrid from "../../components/instagram-grid";
import { fetchState } from "../../util/context";

export default function Post({ postShortcode }) {
    const [dataState, setDataState] = useState(null);
    const [extraDataState, setExtraDataState] = useState({});

    useEffect(() => {
        fetchState(setDataState,`/posts/${postShortcode}`)
    }, [postShortcode])

    useEffect(() => {
        if (dataState) {
            fetchState(setExtraDataState,`/posts/${postShortcode}/more`, { userId: dataState.owner.id, first: 12, after: undefined })
        }
    }, [dataState])

    return (dataState ?
            <Layout>
                <InstagramPost post={dataState} />
                <InstagramGrid mediaArray={extraDataState.mediaArray} title={`More posts from ${dataState.owner.username}`} />
            </Layout>
            :
            <Instagram />
    )
};


export async function getServerSideProps(context) {
    const postShortcode = context.params.postShortcode
    return {
        props: {
            postShortcode,
            fetchURL: `/posts/${postShortcode}`
        }
    }
}
import { publicFetch } from "./fetcher";
import Router from "next/router";

export function fetchState(setContext, fetchUrl, params) {
    publicFetch.get(fetchUrl, { params }).then(response => {
        if (response.data.error) {
            Router.push('/404')
        } else {
            setContext(response.data)
        }
    })
}

export async function fetchExtendState(context, setContext, url, params) {
        await publicFetch.get(url, { params }).then( response => {
            setContext({
                ...context,
                timelineMedia: { pageInfo: response.data.pageInfo, mediaArray: context.timelineMedia.mediaArray.concat(response.data.mediaArray) }
            })
        })
}
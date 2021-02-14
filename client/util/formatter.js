import React from "react";

export function numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'k'; // convert to K for number from > 1000 < 1 million
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
}


export function urlFormatter(url) {
    return new URL(url).hostname
}

export function bioFormatter(bio) {
    return bio.split(/(?:\r\n|\r|\n)/g).map(function(item) {
        return (
            <>
                {item}
                <br/>
            </>
        )
    })
}

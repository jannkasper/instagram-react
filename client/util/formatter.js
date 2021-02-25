import React from "react";

export function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num/1000).toFixed(1) + 'k'; // convert to K for number from > 1000 < 1 million
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
}

export function numCommaFormatter(num) {
    return num.toString().replaceAll(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function dateFormatter(date) {
    const createdDate = new Date(date * 1000);
    const currentDate = new Date();
    const milliseconds = Math.abs(currentDate - createdDate);
    const hours = Math.floor(milliseconds / 36e5);
    if (hours < 24) {
        return hours + ` ${hours > 1 ? 'HOURS' : 'HOUR'} AGO`;
    } else if (hours < 168) {
        return Math.floor(hours / 24) + ` ${hours/24 > 1 ? 'DAYS' : 'DAY'} AGO`;
    } else {
        let resultDate = ""
        resultDate += createdDate.toLocaleString('default', { month: 'long' }); // month name
        resultDate += " " + createdDate.getDate(); // day number
        if (createdDate.getFullYear() !== currentDate.getFullYear()) {
            resultDate += ", " + createdDate.getFullYear(); // year
        }
        return resultDate
    }
}

export function timeFormatter(time) {
    const createdDate = new Date(time * 1000);
    const currentDate = new Date();
    const milliseconds = Math.abs(currentDate - createdDate);
    const hours = Math.floor(milliseconds / 36e5);
    if (hours < 24) {
        return hours + "h";
    } else if (hours < 168) {
        return Math.floor(hours / 24) + "d";
    } else if (hours < 61320) {
        return Math.floor(hours / 24 / 7) + "w";
    } else {
        return Math.floor(hours / 24 / 7 / 365) + "y";
    }
}

export function urlFormatter(url) {
    return new URL(url).hostname
}

export function bioFormatter(bio) {

    let test = bio.replace("\n", "<ERR>").split("<ERR>")
    if (test.length > 1) {
        return bio.split(/(?:\r\n|\r|\n)/g).map(function(item) {
            return (
                <>
                    {item}
                    <br/>
                </>
            )
        })
    }
    return test

}

export function hashtagFormatter(text) {
    if (!text) {
        return [text];
    }
    const hashArray = text.match(/#(\w+)/g);

    if (!hashArray || hashArray.length === 0) {
        return [text];
    }

    let splitHashesArray = text.replace(/#/gi, "<ERR>#").split("<ERR>");
    let splitSpacesArray = [];
    for (const item of splitHashesArray) {
        splitSpacesArray.push(...item.replace(" ", "<ERR> ").split("<ERR>"))
    }

    return splitSpacesArray
}

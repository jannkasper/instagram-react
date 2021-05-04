import axios from "axios";

export function retrieveImage(url) {
    return axios.get(url, {
        responseType: 'arraybuffer'
    })
        .then(response => {
            const  prefix = "data:" + response.headers["content-type"] + ";base64,";
            const img = Buffer.from(response.data, 'binary').toString("base64");
            return prefix + img;
        })
}

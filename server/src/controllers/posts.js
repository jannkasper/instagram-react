import {getPage} from "../utils/session.js";


export const postContent = async (req, res) => {
    const postId = req.params.postId;
    const page = getPage()

    console.log("4\tEnter selected profile")
    await page.goto(`https://www.instagram.com/p/${postId}`);

    let sharedData = await page.evaluate(() => {
        return window.__additionalData
    });

    sharedData = sharedData[`/p/${postId}/`].data.graphql.shortcode_media

    return res.status(200).json(sharedData);

}
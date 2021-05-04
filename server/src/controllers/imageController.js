import { errorHandling, imageBase64Convert } from "../utils/fetcher.js";

export const loadImage = async (req,res) => {
    const imageUrl = req.query.url;
    const imageBase64 = await imageBase64Convert(imageUrl)
        .catch(errorHandling);

    return res.status(200).end(imageBase64)
}

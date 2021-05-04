import { errorHandler } from "../utils/handler.js";
import { retrieveImage } from "../utils/image.js";

export const loadImage = async (req,res) => {
    const imageUrl = req.query.url;
    const imageBase64 = await retrieveImage(imageUrl)
        .catch(errorHandler);

    return res.status(200).end(imageBase64)
}

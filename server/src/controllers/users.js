import {getPage} from "../utils/session.js";


export const userContent = async (req, res) => {
    const username = req.params.username;

    console.log("4\tEnter selected profile")
    await getPage().goto(`https://www.instagram.com/${username}`);
    // await getPage().screenshot({path: `public/${Date.now()}.png`});

    return res.status(200).json({ message: "There was a problem creating your account." });

}
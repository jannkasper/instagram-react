import express from "express";
import { userContent, nextPageContent } from "./controllers/users.js";
import { postContent, morePostsContent, postMoreComments } from "./controllers/posts.js";
import { searchContent } from "./controllers/search.js"
import { tagContent, nextPageTagContent } from "./controllers/tags.js";
import { locationContent, nextPageLocationContent } from "./controllers/locations.js";

const router = express.Router();

//users
router.get("/users/:username", userContent);
router.get("/users/:username/page", nextPageContent);

//posts
router.get("/posts/:postId", postContent);
router.get("/posts/:postId/more", morePostsContent);
router.get("/posts/:postId/comments", postMoreComments);

//tag
router.get("/tags/:tag", tagContent);
router.get("/tags/:tag/page", nextPageTagContent);

//location
router.get("/locations/:locationId/:locationName", locationContent);
router.get("/locations/:locationId/:locationName/page", nextPageLocationContent);

//search
router.get("/search/:query", searchContent);

export default (app) => {
    app.use("/api", router);


    app.use((req, res, next) => {
        const error = new Error("Not found");
        error.status = 404;
        next(error);
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500).json({message: error.message})
    });
}
import express from "express";
import { userContent, nextPageContent } from "./controllers/users.js";
import { postContent, morePostsContent } from "./controllers/posts.js";

const router = express.Router();

//users
router.get("/users/:username", userContent);
router.get("/users/:username/page", nextPageContent);

//posts
router.get("/posts/:postId", postContent);
router.get("/posts/:postId/more", morePostsContent);

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
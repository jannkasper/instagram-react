import express from "express";
import {
    loadPosts,
    loadPost,
    loadUser,
    loadSearch,
    loadHashtag,
    loadLocation,
    loadUserStories,
    loadComments,
    loadLocationFeed,
    loadPostFeed,
    loadHashtagFeed,
    loadUserFeed,
    loadUserReelsFeed,
    loadUserTaggedFeed,
    loadImage } from "./controllers/index.js";

const router = express.Router();

//users
router.get("/users/:username", loadUser);
router.get("/users/:username/timelineMedia/page", loadUserFeed);
router.get("/users/:username/tagged/page", loadUserTaggedFeed);
router.get("/users/:username/reels/page", loadUserReelsFeed);
router.get("/users/:username/stories", loadUserStories);

//posts
router.get("/posts", loadPosts);
router.get("/posts/:postId", loadPost);
router.get("/posts/:postId/more", loadPostFeed);
router.get("/posts/:postId/comments", loadComments);

//hashtag
router.get("/tags/:tag", loadHashtag);
router.get("/tags/:tag/page", loadHashtagFeed);

//location
router.get("/locations/:locationId/:locationName", loadLocation);
router.get("/locations/:locationId/:locationName/page", loadLocationFeed);

//search
router.get("/search/:query", loadSearch);

//image
router.get("/image", loadImage);

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

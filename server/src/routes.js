import express from "express";
import { loadPosts, loadPost } from "./controllers/posts.js";
import { loadUser } from "./controllers/users.js";
import { loadSearch } from "./controllers/search.js"
import { loadTag } from "./controllers/tags.js";
import { loadLocation } from "./controllers/locations.js";
import { loadUserStories } from "./controllers/stories.js";
import { loadComments } from "./controllers/comments.js";
import { loadLocationFeed, loadPostFeed, loadTagFeed, loadUserFeed, loadUserReelsFeed, loadUserTaggedFeed } from "./controllers/feed.js";

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

//tag
router.get("/tags/:tag", loadTag);
router.get("/tags/:tag/page", loadTagFeed);

//location
router.get("/locations/:locationId/:locationName", loadLocation);
router.get("/locations/:locationId/:locationName/page", loadLocationFeed);

//search
router.get("/search/:query", loadSearch);

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
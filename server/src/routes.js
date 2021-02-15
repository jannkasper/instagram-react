import express from "express";
import { userContent, nextPageContent } from "./controllers/users.js";
import { postContent } from "./controllers/posts.js";

const router = express.Router();

let isOpen = true;

export function setIsOpen(value) {
    isOpen = value;
}

const checkIsOpen = async (req, res, next) => {
    if(isOpen == false) {
        setTimeout(() => checkIsOpen(req, res, next), 100); /* this checks the flag every 100 milliseconds*/
    } else {
        setIsOpen(false);
        next();
    }
}

//users
router.get("/users/:username", checkIsOpen, userContent);
router.get("/users/:username/page", nextPageContent);

//posts
router.get("/posts/:postId", checkIsOpen, postContent);

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
import express from "express";
import {createPost, deletePost, getPost, getPosts, updatePost} from "../controllers/postController.js";


const router = express.Router();
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth(),createPost);
router.delete("/:id",auth(),deletePost);
router.patch("/:id",auth(), updatePost);

export default router
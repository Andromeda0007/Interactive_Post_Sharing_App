import express from "express";
import { createTweet, deleteTweet, getAllMyTweets, getFollowingTweets, likeOrDislike } from "../controllers/tweetController.js";
import { isAuthenticated } from "../config/auth.js";
const router = express.Router();

router.route("/create").post(isAuthenticated, createTweet);
router.route("/delete/:id").delete(isAuthenticated, deleteTweet);
router.route("/like/:id").put(isAuthenticated, likeOrDislike);
router.route("/getallmytweets/:id").get(isAuthenticated, getAllMyTweets);
router.route("/getfollowingtweets/:id").get(isAuthenticated, getFollowingTweets);

export default router;
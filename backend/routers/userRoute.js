import express from "express";
import { Register, Login, Logout, Bookmark, getMyProfile, getOtherUsers, Follow, Unfollow} from "../controllers/userController.js";
import { isAuthenticated } from "../config/auth.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/bookmark/:id").put(isAuthenticated, Bookmark);
router.route("/profile/:id").get(isAuthenticated, getMyProfile);
router.route("/otheruser/:id").get(isAuthenticated, getOtherUsers);
router.route("/follow/:id").post(isAuthenticated, Follow);
router.route("/unfollow/:id").post(isAuthenticated, Unfollow);
export default router;  
import express from "express";
import {
  signup,
  login,
  getUserProfile,
  bookmarkEvent,
  getBookmarkedEvents,
  getUserDashboard,
} from "../controller/auth.js";

const authRouter = express.Router();

authRouter.route("/signup").post(signup);

authRouter.route("/login").post(login);

authRouter.route("/profile").get(getUserProfile);

authRouter.route("/bookmark/:userId/:eventId").post(bookmarkEvent);
authRouter.route("/bookmarks/:userId").get(getBookmarkedEvents);
authRouter.route("/dashboard/:userId").get(getUserDashboard);

export default authRouter;

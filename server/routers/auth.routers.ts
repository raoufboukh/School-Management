import express from "express";
import passport from "passport";
import {
  checkAuth,
  failed,
  logout,
  register,
  success,
} from "../controllers/auth.controllers.ts";

const router = express.Router();
router.get("/check", checkAuth);
router.post("/register", register);
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Login successful", user: req.user });
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failed",
    session: true,
  }),
  (req, res) => {
    console.log("Google Auth Success:", req.user);
    res.redirect("http://localhost:3000/");
  }
);

router.get("/success", success);
router.get("/failed", failed);
router.get("/logout", logout);

export default router;

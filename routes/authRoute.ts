import express from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

//Github login Endpoint
router.get(
	"/github",
	passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
	"/github/callback",
	passport.authenticate("github", { failureRedirect: "/login" }),
	function (req, res) {
		// Successful authentication, redirect home.
		res.redirect("/dashboard");
	}
);

router.get("/login", forwardAuthenticated, (req, res) => {
	res.render("login", { message: req.flash("error") });
});

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/auth/login",
		failureFlash: true,
		// req.session.messages
		/* FIX ME: 😭 failureMsg needed when login fails */
	})
);

router.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) console.log(err);
	});
	res.redirect("/auth/login");
});

export default router;

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
	getUserByEmailIdAndPassword,
	getUserById,
} from "../../controllers/userController";
import { PassportStrategy } from "../../interfaces/index";

const localStrategy = new LocalStrategy(
	{
		usernameField: "email",
		passwordField: "password",
	},
	(email, password, done) => {
		const user = getUserByEmailIdAndPassword(email, password);
		return user
			? done(null, user)
			: done(null, false, {
					message:
						"Your login details are not valid. Please try again",
			  });
	}
);

/*
FIXED (types) 😭
*/
passport.serializeUser(function (user: Express.User, done: any) {
	done(null, user.id);
});

/*
FIXED (types) 😭
*/
passport.deserializeUser(function (id: number, done: any) {
	let user = getUserById(id);
	if (user) {
		done(null, user);
	} else {
		done({ message: "User not found" }, null);
	}
});

const passportLocalStrategy: PassportStrategy = {
	name: "local",
	strategy: localStrategy,
};

export default passportLocalStrategy;

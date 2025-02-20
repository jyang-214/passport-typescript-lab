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
		try {
			const user = getUserByEmailIdAndPassword(email, password);
			if (!user) {
				return done(null, false, {
					message: "Password is incorrect",
				});
			}
			return done(null, user);
		} catch (error) {
			return done(null, false, { message: `${error}` });
		}
	}
);

declare global {
	namespace Express {
		interface User {
			id: number;
			name: string;
			email: string;
			password: string;
		}
	}
}

/*
FIXED (types) 😭
*/
passport.serializeUser(function (
	user: Express.User,
	done: (err: any, id?: number) => void
) {
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

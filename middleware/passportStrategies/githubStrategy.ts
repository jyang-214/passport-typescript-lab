import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import { Request } from "express";
import { Profile } from "passport";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
	{
		clientID: "9d999824538dc3ebe524",
		clientSecret: "653cf28ccae28b5362d5f79a0fae5aa5d4d90af7",
		callbackURL: "http://localhost:8000/auth/github/callback",
		passReqToCallback: true,
	},

	/* FIXED 😭 */
	async (
		req: Request,
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: any
	) => {
		// email
		// username
		// {email, username} -> save into your databse
		// done(null, {email, username})
	}
);

const passportGitHubStrategy: PassportStrategy = {
	name: "github",
	strategy: githubStrategy,
};

export default passportGitHubStrategy;

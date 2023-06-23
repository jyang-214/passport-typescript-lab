import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import { Request } from "express";
import { Profile } from "passport";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
	{
		clientID: "",
		clientSecret: "",
		callbackURL: "",
		passReqToCallback: true,
	},

	/* FIXED 😭 */
	async (
		req: Request,
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: any
	) => {}
);

const passportGitHubStrategy: PassportStrategy = {
	name: "github",
	strategy: githubStrategy,
};

export default passportGitHubStrategy;

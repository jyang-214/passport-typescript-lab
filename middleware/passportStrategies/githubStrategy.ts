import { Strategy as GitHubStrategy } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import passport from "passport";
import { database } from "../../models/userModel";
import "dotenv/config";
import { env } from "process";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
	{
		clientID: `${env.GITHUB_CLIENT_ID}`,
		clientSecret: `${env.GITHUB_CLIENT_SECRET}`,
		callbackURL: `${env.GITHUB_CALLBACK_URL}`,
	},
	function (accessToken: any, refreshToken: any, profile: any, done: any) {
		process.nextTick(function () {
			const gitUser = {
				id: profile.id,
				name: profile.username,
				email: `${profile.username}@my.bcit.ca`,
				password: `${profile.username}123`,
			};
			database.push(gitUser);
			return done(null, profile);
		});
	}
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(function (obj: any, done) {
	done(null, obj);
});

const passportGitHubStrategy: PassportStrategy = {
	name: "github",
	strategy: githubStrategy,
};

export default passportGitHubStrategy;

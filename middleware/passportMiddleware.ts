import { Application } from "express";
import passport from "passport";
import PassportConfig from "./PassportConfig";
import flash from "connect-flash";

import localStrategy from "./passportStrategies/localStrategy";
import passportGitHubStrategy from "./passportStrategies/githubStrategy";

const strategies = [localStrategy, passportGitHubStrategy];
const passportConfig = new PassportConfig(strategies);

const passportMiddleware = (app: Application): void => {
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
};

export default passportMiddleware;

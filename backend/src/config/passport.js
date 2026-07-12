import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import {User} from "../models/user.model.js";

const BACKEND_URL  = process.env.BACKEND_URL  || "http://localhost:3000";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const setOAuthCookiesAndRedirect = (res, user) => {
  const accessToken  = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const isProd = process.env.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: true,
    secure:   isProd,
    sameSite: isProd ? "none" : "strict", // "none" required for cross-site cookies in production
  };

  res.cookie("accessToken",  accessToken,  cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.redirect(`${FRONTEND_URL}/dashboard`);
};

const generateUsername = async (baseName) => {
  const slug = baseName.toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 20);
  let username = slug;
  let counter  = 0;
  while (await userModel.findOne({ username })) {
    counter++;
    username = `${slug}_${counter}`;
  }
  return username;
};

passport.use(
  new GoogleStrategy(
    {
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:  `${BACKEND_URL}/api/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email    = profile.emails?.[0]?.value;
        const fullName = profile.displayName || "Google User";
        const avatar   = profile.photos?.[0]?.value || "";

        if (!email) return done(new Error("No email from Google"), null);

        let user = await userModel.findOne({ email });
        if (user) {
          if (avatar && !user.avatar) { user.avatar = avatar; await user.save(); }
          return done(null, user);
        }

        const username = await generateUsername(fullName);
        user = await userModel.create({
          fullName, username, email, avatar, authProvider: "google",
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID:     process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:  `${BACKEND_URL}/api/auth/github/callback`,
      scope:        ["user:email"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email =
          profile.emails?.find((e) => e.primary && e.verified)?.value ||
          profile.emails?.[0]?.value;

        const fullName = profile.displayName || profile.username || "GitHub User";
        const avatar   = profile.photos?.[0]?.value || "";

        if (!email) return done(new Error("No email from GitHub — make your GitHub email public"), null);

        let user = await userModel.findOne({ email });
        if (user) {
          if (avatar && !user.avatar) { user.avatar = avatar; await user.save(); }
          return done(null, user);
        }

        const username = await generateUsername(profile.username || fullName);
        user = await userModel.create({
          fullName, username, email, avatar, authProvider: "github",
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
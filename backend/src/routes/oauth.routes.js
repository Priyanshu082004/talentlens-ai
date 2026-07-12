import { Router } from "express";
import passport from "../config/passport.js";
import { setOAuthCookiesAndRedirect } from "../config/passport.js";

const oauthRouter = Router();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

oauthRouter.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

oauthRouter.get("/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${FRONTEND_URL}/login?error=google_failed`,
  }),
  (req, res) => setOAuthCookiesAndRedirect(res, req.user)
);

oauthRouter.get("/github",
  passport.authenticate("github", { scope: ["user:email"], session: false })
);

oauthRouter.get("/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${FRONTEND_URL}/login?error=github_failed`,
  }),
  (req, res) => setOAuthCookiesAndRedirect(res, req.user)
);

export default oauthRouter;
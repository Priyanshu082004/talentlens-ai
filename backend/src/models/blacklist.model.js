import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required to be added in blacklist"],
    },
  },
  {
    timestamps: true,
  }
);

const tokenBlacklistModel = mongoose.model(
  "blacklistTokens",
  blacklistTokenSchema
);

export default tokenBlacklistModel;


// This file defines a Mongoose schema and model for blacklisting tokens.
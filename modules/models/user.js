import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, index: true, unique: true, sparse: true },
    password: String,
    role: { type: String, enum: ["admin", "surveyor", "validator"] },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("user", UserSchema);

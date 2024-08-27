import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
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

export const UserModel = mongoose.models["user"] ?? mongoose.model("user", UserSchema);

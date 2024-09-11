import mongoose from "mongoose";

const TrashSchema = mongoose.Schema(
  {
    type: String,
    data: mongoose.Mixed,
  },
  {
    timestamps: true,
  }
);

export const TrashModel =
  mongoose.models["trash"] ?? mongoose.model("trash", TrashSchema);

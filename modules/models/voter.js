import mongoose from "mongoose";

const VoterAddressSchema = new mongoose.Schema({
  houseNo: String,
  street: String,
  subdivision: String,
  barangay: String,
  city: String,
  state: String,
  zipCode: String,
});

const VoterName = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
});

const VoterSchema = new mongoose.Schema({
  precinctNo: String,
  fullName: { type: String, index: true, unique: true },
  name: { type: VoterName },
  address: { type: VoterAddressSchema },
  status: { type: String, enum: ["Supporter", "Anti", "Undecided"] },
  surviedBy: Array,
  validatedBy: Array,
});

export const VoterModel = mongoose.models["voter"] ?? mongoose.model("voter", VoterSchema)

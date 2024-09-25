import Joi from "joi";
import { VoterModel } from "../models/voter";
import { SavingError } from "../utilities/error";

export default class VoterService {
  async addVoter(newVoter) {
    const input = await Joi.object({
      precinctNo: Joi.string(),
      name: Joi.object({
        firstName: Joi.string(),
        middleName: Joi.string(),
        lastName: Joi.string(),
      }),
      address: Joi.object({
        houseNo: Joi.string(),
        street: Joi.string(),
        subdivision: Joi.string(),
        barangay: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zipCode: Joi.string(),
      }),
      phone: Joi.string().regex(/^(09|\+639)\d{9}$/),
      family: Joi.array().items(
        Joi.object({
          name: Joi.string(),
          relation: Joi.string().valid(
            "parent",
            "child",
            "spouse",
            "grandparent",
            "relative"
          ),
        })
      ),
    }).validateAsync(newVoter);

    try {
      const voter = new VoterModel(input);
      return await voter.save();
    } catch {
      throw new SavingError();
    }
  }
}

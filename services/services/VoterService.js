import { VoterModel } from "../data/voter";
import { SavingError } from "../utilities/error";
import { newVoterSchema } from "../schemas/newVoterSchema";


export default class VoterService {
  async addVoter(newVoter) {
    const input = newVoterSchema.parse(newVoter);

    try {
      const voter = new VoterModel(input);
      return await voter.save();
    } catch {
      throw new SavingError();
    }
  }
}

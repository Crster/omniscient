import { newVoterSchema } from "../schemas/voterSchema";
import { db } from "../utilities/database";
import { SavingError } from "../utilities/error";

export default class VoterRepository {
  async getVoter(voterId) {
    const voter = await db.voter.findOne({ voterId });
    return voter;
  }

  async addVoter(newVoter) {
    const input = newVoterSchema.parse(newVoter);

    try {
      const result = await db.voter.insertOne(input);
      return await this.getVoter(result.insertedId);
    } catch {
      throw new SavingError();
    }
  }
}

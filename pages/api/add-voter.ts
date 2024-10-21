import { apiHandler } from "@/libraries/ApiHandler";
import { NotCreatedError } from "@/libraries/Error";
import { Voter } from "@/services/Voter/Voter";
import { VoterRepository } from "@/services/Voter/VoterRepository";

export default apiHandler<Voter, void>(async (req) => {
  const voter = new Voter(req.value);

  const voterRepo = new VoterRepository();
  const voterId = await voterRepo.create(voter);

  if (!voterId) throw new NotCreatedError(`Voter ${voter.name} not created`, { voterId });
});

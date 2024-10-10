import VoterService from "@/models/Voter/VoterService";
import { apiHandler } from "@/libraries/ApiHandler";
import { NotCreatedError } from "@/libraries/Error";

export default apiHandler(async (req) => {
  const voterService = new VoterService();

  const voterId = await voterService.create(req.value);

  if (!voterId) throw new NotCreatedError("Voter is not created", { voterId });

  return voterId;
});

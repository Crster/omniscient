import { apiHandler } from "@/libraries/ApiHandler";
import VoterService from "@/models/Voter/VoterService";

export default apiHandler(async (req) => {
  const voterService = new VoterService();

  const voter = await voterService.getById(req.key as string);

  return voterService.toVoterDto(voter);
});

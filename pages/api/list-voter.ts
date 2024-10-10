import { apiHandler } from "@/libraries/ApiHandler";
import VoterService from "@/models/Voter/VoterService";

export default apiHandler(async (req) => {
  const voterService = new VoterService();

  const voters = await voterService.getList(req.value);

  return voterService.toListVoterDto(voters);
});

import { apiHandler } from "@/libraries/ApiHandler";
import CandidateService from "@/models/Candidate/CandidateService";

export default apiHandler(async (req) => {
  const candidateService = new CandidateService();

  const candidates = await candidateService.getList(req.value);

  return candidateService.toListCandidateDto(candidates);
});

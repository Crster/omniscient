import { apiHandler } from "@/libraries/ApiHandler";
import { NotCreatedError } from "@/libraries/Error";
import CandidateService from "@/models/Candidate/CandidateService";

export default apiHandler(async (req) => {
  const candidateService = new CandidateService();

  const candidateId = await candidateService.create(req.value);

  if (!candidateId) throw new NotCreatedError("Candidate is not created", { candidateId });

  return candidateId;
});

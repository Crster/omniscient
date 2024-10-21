import { apiHandler } from "@/libraries/ApiHandler";
import { NotCreatedError } from "@/libraries/Error";
import { Candidate } from "@/services/Candidate/Candidate";
import { CandidateRepository } from "@/services/Candidate/CandidateRepository";

export default apiHandler<Candidate, void>(async (req) => {
  const candidate = new Candidate(req.value);

  const candidateRepo = new CandidateRepository();
  const candidateId = await candidateRepo.create(candidate);

  if (!candidateId) throw new NotCreatedError(`Candidate ${candidate.name} not created`, { candidateId });
});

import { CandidateRepository } from "../repository";
import { addCandidateRequest } from "../requests/addCandidateRequest";

const candidateRepo = new CandidateRepository();

export async function addCandidateAction(request: addCandidateRequest) {
  const candidateId = await candidateRepo.create(request);

  return candidateId;
}

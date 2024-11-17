import { CandidateRepository } from "../repository";
import { listCandidateRequest } from "../requests/listCandidateRequest";

export async function listCandidateAction(request: listCandidateRequest) {
  const candidateRepo = new CandidateRepository();
  const candidates = await candidateRepo.getListByName(request.filter);

  return candidates;
}

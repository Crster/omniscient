import { CandidateRepository } from "../repository";
import { listCandidateByPositionRequest } from "../requests/listCandidateByPositionRequest";

export async function listCandidateByPositionAction(request: listCandidateByPositionRequest) {
  const candidateRepo = new CandidateRepository();

  const candidates = await candidateRepo.getListByPosition(request.position);

  return candidates;
}

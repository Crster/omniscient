import { CandidateRepository } from "../repository";
import { listCandidateRequest } from "../requests/listCandidateRequest";

const candidateRepo = new CandidateRepository();

export async function listCandidateAction(request: listCandidateRequest) {
  const candidates = await candidateRepo.getList(request.filter);

  return candidates;
}

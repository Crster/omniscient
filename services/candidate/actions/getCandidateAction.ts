import { CandidateRepository } from "../repository";
import { getCandidateRequest } from "../requests/getCandidateRequest";

import { InternalServerError } from "@/libraries/Error";

export async function getCandidateAction(request: getCandidateRequest) {
  const candidateRepo = new CandidateRepository();
  const candidate = await candidateRepo.getById(request.candidateId);

  if (!candidate) throw new InternalServerError("Candidate not found", { candidate });

  return candidate;
}

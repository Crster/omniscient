import { CandidateRepository } from "../repository";
import { getCandidateRequest } from "../requests/getCandidateRequest";

import { InternalServerError } from "@/libraries/Error";

const candidateRepo = new CandidateRepository();

export async function getCandidateAction(request: getCandidateRequest) {
  const candidate = await candidateRepo.getById(request.candidateId);

  if (!candidate) throw new InternalServerError("Candidate not found", { candidate });

  return candidate;
}

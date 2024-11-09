import { Candidate, CandidateDto } from "../model";

import { createCandidatePresenter } from "./createCandidatePresenter";

export function createCandidateListPresenter(candidates: Array<Candidate>): Array<CandidateDto> {
  return candidates.map((candidate) => createCandidatePresenter(candidate));
}

import { Candidate, CandidateSimpleDto } from "../model";

import { createCandidateSimplePresenter } from "./createCandidateSimplePresenter";

export function createCandidateListSimplePresenter(candidates: Array<Candidate>): Array<CandidateSimpleDto> {
  return candidates.map((candidate) => createCandidateSimplePresenter(candidate));
}

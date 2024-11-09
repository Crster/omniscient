import { Voter, VoterDto } from "../model";

import { createVoterPresenter } from "./createVoterPresenter";

export function createVoterListPresenter(voters: Array<Voter>): Array<VoterDto> {
  return voters.map((voter) => createVoterPresenter(voter));
}

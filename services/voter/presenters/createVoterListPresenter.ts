import { Voter, VoterDto } from "../model";

import { createVoterPresenter } from "./createVoterPresenter";

import { Survey } from "@/services/survey/model";

export function createVoterListPresenter(voters: Array<Voter>, survey: Map<string, Survey>): Array<VoterDto> {
  return voters.map((voter) => createVoterPresenter(voter, survey.get(voter.voterId)));
}

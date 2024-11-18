import { Voter, VoterDto } from "../model";

import { Survey } from "@/services/survey/model";

export function createVoterPresenter(voter: Voter, survey?: Survey): VoterDto {
  return {
    voterId: voter.voterId,
    precinctNo: voter.precinctNo,
    name: `${voter.name.lastName}, ${voter.name.firstName}`,
    barangay: voter.address.barangay,
    purok: voter.address.purok,
    status: survey?.status || "",
    surveyor: survey?.surveyor.name || "",
    validator: survey?.validator.name || "",
    candidate: survey?.candidate.name || "",
  };
}

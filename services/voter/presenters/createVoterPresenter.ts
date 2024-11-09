import { Voter, VoterDto } from "../model";

export function createVoterPresenter(voter: Voter): VoterDto {
  return {
    voterId: voter.voterId,
    precinctNo: voter.precinctNo,
    name: `${voter.name.lastName}, ${voter.name.firstName}`,
    barangay: voter.address.barangay,
    purok: voter.address.purok,
    status: "#1 Supporter",
    surveyor: "admin",
    validator: "admin",
    candidate: "Kagan",
  };
}

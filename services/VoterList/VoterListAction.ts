import { Voter } from "../Voter/Voter";

import { VoterList } from ".";

export async function getList() {
  const voters = await Voter.getList();

  return voters.map((voter) => {
    const ret: VoterList = {
      barangay: voter.address.barangay,
      candidate: "",
      name: Voter.getFullname(voter),
      precinctNo: voter.precinctNo,
      purok: voter.address.purok,
      status: "",
      surveyor: "",
      validator: "",
    };

    return ret;
  });
}

import { Voter } from "./Voter";

export type VoterList = {
  voterId: string;
  precinctNo: string;
  name: string;
  purok?: string;
  barangay: string;
  candidate: string;
  status: string;
  surveyor: string;
  validator: string;
};

export const VoterList = {
  async generate() {
    const result = await Voter.collection.find({}).toArray();

    return result.map((item) => {
      const ret: VoterList = {
        voterId: item._id.toString(),
        precinctNo: item.precinctNo,
        name: item.name.lastName + ", " + item.name.firstName + " " + item.name.middleName,
        purok: item.address.purok,
        barangay: item.address.barangay,
        candidate: "",
        status: "",
        surveyor: "",
        validator: "",
      };

      return ret;
    });
  },
};

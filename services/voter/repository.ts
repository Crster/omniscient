import { IVoter } from "./model";

import { BaseRepository } from "@/libraries/BaseRepository";

export class VoterRepository extends BaseRepository<"voterId", IVoter> {
  constructor() {
    super("voters", (voter) => {
      if (voter) {
        return {
          name: voter.name,
          email: voter.email,
          address: voter.address,
          birthDate: voter.birthDate,
          gender: voter.gender,
          civilStatus: voter.civilStatus,
          family: voter.family,
          mobileNo: voter.mobileNo,
          placeOfBirth: voter.placeOfBirth,
          precinctNo: voter.precinctNo,
          socialGroup: voter.socialGroup,
          tin: voter.tin,
          citizenship: voter.citizenship,
          occupation: voter.occupation,
          voterId: voter._id.toHexString(),
        };
      }
    });
  }

  async getListByName(filter?: string) {
    return filter
      ? super.getList({
          $or: [
            { "$name.firstName": { $regex: filter, $options: "i" } },
            { "$name.lastName": { $regex: filter, $options: "i" } },
          ],
        })
      : super.getList();
  }
}

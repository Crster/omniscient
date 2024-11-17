import { CivilStatus } from "../civil-status/model";
import { FamilyRelation } from "../family-relation/model";

export interface IVoter {
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  address: {
    barangay: string;
    city: string;
    province: string;
    purok: string;
    country?: string;
    houseNo?: string;
    street?: string;
    zipCode?: string;
  };
  mobileNo?: string;
  email?: string;
  precinctNo: string;
  gender: string;
  birthDate: Date;
  placeOfBirth?: {
    barangay?: string;
    city: string;
    province?: string;
  };
  family?: Array<{
    name: string;
    relation: FamilyRelation;
  }>;
  civilStatus: CivilStatus;
  tin?: string;
  citizenship?: string;
  socialGroup?: Array<string>;
  occupation?: string;
}

export interface Voter extends IVoter {
  voterId: string;
}

export interface VoterDto {
  voterId: string;
  precinctNo: string;
  name: string;
  purok: string;
  barangay: string;
  candidate: string;
  status: string;
  surveyor: string;
  validator: string;
}

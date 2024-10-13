import { Genders } from "../Voter/VoterSchema";

export enum Positions {
  President = "PRESIDENT",
  VicePresident = "VICE PRESIDENT",
  Senator = "SENATOR",
  HouseOfRepresentatives = "HOUSE OF REPRESENTATIVES",
  ProvincialGovernor = "PROVINCIAL GOVERNOR",
  ProvincialViceGovernor = "PROVINCIAL VICE GOVERNOR",
  SangguniangPanlalawigan = "SANGGUNIANG PANGLALAWIGAN",
  Mayor = "MAYOR",
  ViceMayor = "VICE MAYOR",
  SangguniangPanlungsod = "SANGGUNIANG PANLUNGSOD",
  SangguniangBayan = "SANGGUNIANG BAYAN",
  BarangayCaptain = "BARANGAY CAPTAIN",
  BarangayKagawad = "BARANGAY KAGAWAD",
  SangguniangKabataan = "SANGGUNIANG KABATAAN",
  Other = "OTHER",
}

export interface CandidateSchema {
  name: string;
  address: string;
  position: Positions;
  party?: string;
  coalition?: string;
  alias?: string;
  gender?: Genders;
  photoUrl?: string;
  email?: string;
  mobileNo?: string;
}

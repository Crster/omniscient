import { Gender } from "../gender/model";
import { Position } from "../position/model";

export interface ICandidate {
  name: string;
  address: string;
  position: Position;
  party?: string;
  coalition?: string;
  photoUrl?: string;
  email?: string;
  alias?: string;
  mobileNo?: string;
  gender: Gender;
}

export interface Candidate extends ICandidate {
  candidateId: string;
}

export type CandidateDto = Pick<Candidate, "candidateId" | "name" | "position" | "photoUrl" | "party"> & {
  rank: string;
  voters: number;
  popularity: number;
};

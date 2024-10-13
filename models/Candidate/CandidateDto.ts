import { z } from "zod";

import { Genders } from "../Voter/VoterSchema";

import { Positions } from "./CandidateSchema";

import { filterDto, newValueDto, updatedValueDto } from "@/libraries/MongoDb";

export type CandidateFilter = z.infer<typeof CandidateFilterDto>;
export type NewCandidate = z.infer<typeof NewCandidateDto>;
export type ModifiedCandidate = z.infer<typeof ModifiedCandidateDto>;

export interface CandidateDto {
  candidateId: string;
  name: string;
  position: Positions;
  party: string;
  gender: Genders;
  photoUrl: string;
  voters: number;
}

export const CandidateFilterDto = z
  .object({
    name: z.string().optional(),
    position: z.nativeEnum(Positions).optional(),
    party: z.string().optional(),
  })
  .merge(filterDto)
  .optional();

export const NewCandidateDto = z
  .object({
    name: z.string(),
    address: z.string(),
    position: z.nativeEnum(Positions),
    party: z.string().optional(),
    coalition: z.string().optional(),
    alias: z.string().optional(),
    gender: z.nativeEnum(Genders).default(Genders.Male),
    photoUrl: z.string().trim().url().optional(),
    email: z.string().trim().email().optional(),
    mobileNo: z
      .string()
      .trim()
      .regex(/^\d{10}$/)
      .optional(),
  })
  .merge(newValueDto);

export const ModifiedCandidateDto = NewCandidateDto.merge(updatedValueDto).optional();

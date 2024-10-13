import { z } from "zod";

import { Genders } from "../Voter/VoterSchema";

import { Positions } from "./CandidateSchema";

import { newValueDto, updatedValueDto } from "@/libraries/MongoDb";

export type NewCandidate = z.infer<typeof NewCandidateDto>;
export type ModifiedCandidate = z.infer<typeof ModifiedCandidateDto>;

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

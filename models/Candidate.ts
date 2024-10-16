import { z } from "zod";
import { OptionalId, WithId } from "mongodb";

import { Gender } from "./Gender";
import { Position } from "./Position";

import Model from "@/libraries/Model";

const candidateModel = new Model(
  "candidates",
  z.object({
    name: z.string(),
    address: z.string(),
    position: z.nativeEnum(Position),
    party: z.string().optional(),
    coalition: z.string().optional(),
    alias: z.string().optional(),
    photoUrl: z.string().url().optional(),
    email: z.string().email().optional(),
    mobileNo: z.string().optional(),
    gender: z.nativeEnum(Gender),
  }),
);

export type Candidate = ReturnType<typeof candidateModel.create>;

export const Candidate = {
  collection: candidateModel.collection,
  async save(candidate: OptionalId<Candidate>) {
    return await candidateModel.save(candidate);
  },
  async remove(candidate: WithId<Candidate>) {
    return await candidateModel.remove(candidate);
  },
};

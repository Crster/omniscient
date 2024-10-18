import { z } from "zod";
import { OptionalId, WithId } from "mongodb";

import { Gender } from "./Gender";
import { Position } from "./Position";

import DataManager from "@/libraries/DataManager";

const candidateManager = new DataManager(
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

export type Candidate = ReturnType<typeof candidateManager.validate>;

export const Candidate = {
  collection: candidateManager.collection,
  async save(candidate: OptionalId<Candidate>) {
    const candidateId = candidateManager.validateId(candidate);

    if (candidateId) {
      return await candidateManager.update(candidateId, candidate);
    } else {
      return await candidateManager.insert(candidate);
    }
  },
  async remove(candidate: WithId<Candidate>) {
    const candidateId = candidateManager.validateId(candidate);

    if (candidateId) {
      return await candidateManager.remove(candidateId);
    }
  },
};

import { z } from "zod";
import { OptionalId, WithId } from "mongodb";

import { Gender } from "./Gender";
import { CivilStatus } from "./CivilStatus";
import { FamilyRelation } from "./FamilyRelation";

import DataManager from "@/libraries/DataManager";

const voterManager = new DataManager(
  "voters",
  z.object({
    name: z.object({
      firstName: z.string(),
      middleName: z.string().optional(),
      lastName: z.string(),
    }),
    address: z.object({
      houseNo: z.string().optional(),
      street: z.string().optional(),
      purok: z.string().optional(),
      barangay: z.string(),
      city: z.string(),
      province: z.string(),
      country: z.string().optional(),
      zipCode: z.string().optional(),
    }),
    mobileNo: z.string().optional(),
    email: z.string().email().optional(),
    precinctNo: z.string(),
    gender: z.nativeEnum(Gender),
    birthDate: z.date().default(new Date(2000, 0, 1)),
    placeOfBirth: z
      .object({
        barangay: z.string(),
        city: z.string(),
        province: z.string(),
      })
      .optional(),
    civilStatus: z.nativeEnum(CivilStatus).default(CivilStatus.Single),
    citizenship: z.string().default("Filipino"),
    occupation: z.string().optional(),
    tin: z.string().optional(),
    socialGroup: z.array(z.string()).optional(),
    family: z
      .array(
        z.object({
          name: z.string(),
          relation: z.nativeEnum(FamilyRelation).default(FamilyRelation.Parent),
        }),
      )
      .optional(),
  }),
);

export type Voter = ReturnType<typeof voterManager.validate>;

export const Voter = {
  collection: voterManager.collection,
  async getById(voterId: string) {
    return await voterManager.get(voterId);
  },
  async save(voter: OptionalId<Voter>) {
    const voterId = voterManager.validateId(voter);

    if (voterId) {
      return await voterManager.update(voterId, voter);
    } else {
      return await voterManager.insert(voter);
    }
  },
  async remove(voter: WithId<Voter>) {
    const voterId = voterManager.validateId(voter);

    if (voterId) {
      return await voterManager.remove(voterId);
    }
  },
};

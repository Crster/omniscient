import { z } from "zod";

import { Gender } from "../Data/Gender";
import { CivilStatus } from "../Data/CivilStatus";
import { FamilyRelation } from "../Data/FamilyRelation";

export type VoterEntity = z.input<typeof VoterEntity>;

export const VoterEntity = z.object({
  name: z.object({
    firstName: z.string().min(1),
    middleName: z.string().min(1).optional(),
    lastName: z.string().min(1),
  }),
  address: z.object({
    houseNo: z.string().min(1).optional(),
    street: z.string().min(1).optional(),
    purok: z.string().min(1),
    barangay: z.string().min(1),
    city: z.string().min(1),
    province: z.string().min(1),
    zipCode: z.string().min(1).optional(),
    country: z.string().min(1).default("Philippines"),
  }),
  mobileNo: z
    .string()
    .regex(/^(\+\d{1,3}[- ]?)?\d{10}$/)
    .optional(),
  email: z.string().email().optional(),
  precinctNo: z.string().min(1),
  gender: z.nativeEnum(Gender).default(Gender.Male).optional(),
  birthDate: z
    .date()
    .default(new Date(2000, 0, 1))
    .optional(),
  placeOfBirth: z
    .object({
      barangay: z.string().min(1).optional(),
      city: z.string().min(1).optional(),
      province: z.string().min(1).optional(),
    })
    .optional(),
  civilStatus: z.nativeEnum(CivilStatus).default(CivilStatus.Single).optional(),
  citizenship: z.string().min(1).default("Filipino").optional(),
  occupation: z.string().min(1).optional(),
  tin: z.string().min(1).optional(),
  socialGroup: z.array(z.enum(["illiterate", "indigenous", "pwd"])).optional(),
  family: z
    .array(
      z.object({
        name: z.string().min(1),
        relation: z.nativeEnum(FamilyRelation).default(FamilyRelation.Parent),
      }),
    )
    .optional(),
});

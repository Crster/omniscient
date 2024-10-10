import { z } from "zod";

import { CivilStatus, FamilyRelations, Genders } from "./VoterSchema";

import { filterDto } from "@/libraries/MongoDb";

export type VoterFilter = z.infer<typeof VoterFilterDto>;
export type NewVoter = z.infer<typeof NewVoterDto>;
export type ModifiedVoter = z.infer<typeof ModifiedVoterDto>;

export interface VoterDto {
  voterId: string;
  name: string;
  purok: string;
  barangay: string;
  candidate: string;
  status: string;
  validator: string;
  precinctNo: string;
}

export const VoterFilterDto = z
  .object({
    name: z.string().optional(),
    purok: z.string().optional(),
    barangay: z.string().optional(),
    candidate: z.string().optional(),
  })
  .merge(filterDto);

export const NewVoterDto = z.object({
  name: z.object({
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
  }),
  address: z.object({
    houseNo: z.string().optional(),
    street: z.string().optional(),
    purok: z.string(),
    barangay: z.string(),
    city: z.string(),
    province: z.string(),
    zipcode: z.string().optional(),
  }),
  mobileNo: z
    .string()
    .regex(/^\d{10}$/)
    .optional(),
  email: z.string().email().optional(),
  precinctNo: z.string(),
  gender: z.nativeEnum(Genders).default(Genders.Male),
  birthDate: z.date().optional(),
  placeOfBirth: z
    .object({
      barangay: z.string(),
      city: z.string(),
      province: z.string(),
    })
    .optional(),
  civilStatus: z.nativeEnum(CivilStatus).default(CivilStatus.Single),
  citizenship: z.string().default("filipino"),
  occupation: z.string().optional(),
  tin: z.string().optional(),
  socialGroup: z.set(z.string()),
  family: z.array(
    z.object({
      name: z.string(),
      relation: z.nativeEnum(FamilyRelations),
    }),
  ),
});

export const ModifiedVoterDto = NewVoterDto.extend({ voterId: z.string() });

import { z } from "zod";

import { CivilStatus, FamilyRelations, Genders } from "./VoterSchema";

import { filterDto, newValueDto, updatedValueDto } from "@/libraries/MongoDb";

export type VoterFilter = z.infer<typeof VoterFilterDto>;
export type NewVoter = z.infer<typeof NewVoterDto>;
export type ModifiedVoter = z.infer<typeof ModifiedVoterDto>;

export interface VoterDto {
  voterId: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  address: {
    houseNo?: string;
    street?: string;
    purok: string;
    barangay: string;
    city: string;
    province: string;
    zipcode?: string;
  };
  mobileNo?: string;
  email?: string;
  precinctNo: string;
  gender: Genders;
  birthDate?: Date;
  placeOfBirth?: {
    barangay: string;
    city: string;
    province: string;
  };
  civilStatus: CivilStatus;
  citizenship: string;
  occupation?: string;
  tin?: string;
  socialGroup: Set<string>;
  family?: Array<{ name: string; relation: FamilyRelations }>;
}

export interface VoterListDto {
  voterId: string;
  name: string;
  purok: string;
  barangay: string;
  precinctNo: string;
}

export const VoterFilterDto = z
  .object({
    name: z.string().optional(),
    purok: z.string().optional(),
    barangay: z.string().optional(),
    candidate: z.string().optional(),
  })
  .merge(filterDto)
  .optional();

export const NewVoterDto = z
  .object({
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
    precinctNo: z.string().min(4),
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
    family: z
      .array(
        z.object({
          name: z.string(),
          relation: z.nativeEnum(FamilyRelations),
        }),
      )
      .optional(),
  })
  .merge(newValueDto);

export const ModifiedVoterDto = NewVoterDto.extend({ voterId: z.string() }).merge(updatedValueDto);

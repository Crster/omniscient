import { z } from "zod";

import { ValidationError } from "@/libraries/Error";
import { FamilyRelation } from "@/services/family-relation/model";
import { CivilStatus } from "@/services/civil-status/model";
import { Gender } from "@/services/gender/model";
import { toDate } from "@/libraries/Transformer";

const schema = z.object({
  name: z.object({
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
  }),
  address: z.object({
    barangay: z.string(),
    city: z.string(),
    province: z.string(),
    purok: z.string(),
    country: z.string().optional(),
    houseNo: z.string().optional(),
    street: z.string().optional(),
    zipCode: z.string().optional(),
  }),
  mobileNo: z.string().optional(),
  email: z.string().email().optional(),
  precinctNo: z.string(),
  gender: z.nativeEnum(Gender).default(Gender.Male),
  birthDate: z.string().datetime().optional().transform(toDate),
  placeOfBirth: z
    .object({
      barangay: z.string().optional(),
      city: z.string(),
      province: z.string().optional(),
    })
    .optional(),
  family: z
    .array(
      z.object({
        name: z.string(),
        relation: z.nativeEnum(FamilyRelation).default(FamilyRelation.Parent),
      }),
    )
    .optional(),
  civilStatus: z.nativeEnum(CivilStatus).default(CivilStatus.Single),
  tin: z.string().optional(),
  socialGroup: z.array(z.string()).optional(),
  citizenship: z.string().default("filipino"),
  occupation: z.string().optional(),
});

export type addVoterRequest = z.infer<typeof schema>;

export function createAddVoterRequest(input: z.input<typeof schema>) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  return data;
}

import { z } from "zod";

import { ValidationError } from "@/libraries/Error";
import { FamilyRelation } from "@/services/family-relation/model";
import { CivilStatus } from "@/services/civil-status/model";

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
    country: z.string(),
    houseNo: z.string(),
    street: z.string(),
    zipCode: z.string(),
  }),
  mobileNo: z.string(),
  email: z.string().email(),
  precinctNo: z.string(),
  gender: z.string(),
  birthDate: z.date(),
  placeOfBirth: z.object({
    barangay: z.string(),
    city: z.string(),
    province: z.string(),
  }),
  family: z.array(
    z.object({
      name: z.string(),
      relation: z.nativeEnum(FamilyRelation),
    }),
  ),
  civilStatus: z.nativeEnum(CivilStatus),
  tin: z.string(),
  socialGroup: z.array(z.string()),
  citizenship: z.string(),
  occupation: z.string(),
});

export type addVoterRequest = z.infer<typeof schema>;

export function createAddVoterRequest(input: z.input<typeof schema>) {
  const { success, error, data } = schema.safeParse(input);

  if (!success) throw new ValidationError("Invalid request input", error);

  return data;
}

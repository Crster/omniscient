import { z } from "zod";
import { gender } from "../data/gender";
import { civilStatus } from "../data/civil-status";
import { familyRelation } from "../data/family-relation";

export const nameSchema = z.object({
  firstName: z.string(),
  middleName: z.string().empty(""),
  lastName: z.string(),
});

export const addressSchema = z.object({
  houseNo: z.string().empty(""),
  street: z.string().empty(""),
  purok: z.string().empty(""),
  barangay: z.string(),
  city: z.string(),
  province: z.string().empty(""),
  zipcode: z.string().empty(""),
});

export const voterSchema = z.object({
  voterId: z.string().required().hex().length(24).custom(objectId),
  name: nameSchema,
  address: addressSchema,
  mobileNo: z
    .string()
    .empty("")
    .regex(/^\d{10}$/),
  email: z.string().empty("").email(),
  precinctNo: z.string(),
  gender: z
    .string()
    .default("male")
    .valid(...gender.map(ii => ii.key)),
  birthDate: z.date(),
  placeOfBirth: z.object({
    barangay: z.string().empty(""),
    city: z.string().empty(""),
    province: z.string().empty(""),
  }),
  civilStatus: z
    .string()
    .default("single")
    .valid(...civilStatus.map(ii => ii.key)),
  citizenship: z.string().empty("").default("filipino"),
  occupation: z.string().empty(""),
  tin: z.string().empty(""),
  socialGroup: z.object(),
  family: z.array().items(
    z.object({
      name: z.string(),
      relation: z.string().valid(...familyRelation.map(ii => ii.key)),
    }),
  ),
});

export const newVoterSchema = voterSchema.omit({ voterId: true });

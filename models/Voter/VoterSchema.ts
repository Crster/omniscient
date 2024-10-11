export enum Genders {
  Male = "MALE",
  Female = "FEMALE",
  Other = "OTHER",
}

export enum CivilStatus {
  Single = "SINGLE",
  Married = "MARRIED",
  Divorced = "DIVORCED",
  Widowed = "WIDOWED",
}

export enum FamilyRelations {
  Spouse = "SPOUSE",
  Child = "CHILD",
  Parent = "PARENT",
  Sibling = "SIBLING",
  Other = "OTHER",
}

export interface VoterSchema {
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
  family?: Array<{
    name: string;
    relation: FamilyRelations;
  }>;
  createdOn?: Date;
  modifiedOn?: Date;
}

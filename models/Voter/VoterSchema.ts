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
    zip?: string;
    country?: string;
  };
}

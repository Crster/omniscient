from pydantic import BaseModel, Field
from datetime import datetime
from typing import List

from src.models.schema.person import PersonGender


class PersonRelativeDto(BaseModel):
    person_id: int | None = Field(default=None)
    first_name: str
    last_name: str


class PersonAddressDto(BaseModel):
    street_1: str
    street_2: str | None = Field(default=None)
    house_number: str | None = Field(default=None)
    purok: str
    barangay: str
    city: str
    state: str
    zip_code: str


class PersonBirthInfoDto(BaseModel):
    age: int | None = Field(default=None)
    date_of_birth: datetime
    date_of_death: datetime | None = Field(default=None)
    gender: PersonGender


class NewPersonDto(BaseModel):
    first_name: str
    middle_name: str | None = Field(default=None)
    last_name: str

    mobile_number: str | None = Field(default=None)
    email: str | None = Field(default=None)

    address: PersonAddressDto
    birth_info: PersonBirthInfoDto

    father: PersonRelativeDto | None = Field(default=None)
    mother: PersonRelativeDto | None = Field(default=None)
    spouse: PersonRelativeDto | None = Field(default=None)
    children: List[PersonRelativeDto] | None = Field(default=None)

from sqlmodel import SQLModel, Field
from sqlalchemy import Index
from datetime import datetime
from enum import Enum


class PersonGender(str, Enum):
    MALE = "male"
    FEMALE = "female"
    UNKNOWN = "unknown"


class Person(SQLModel, table=True):
    id: int | None = Field(primary_key=True)

    # Name Fields
    first_name: str
    middle_name: str | None
    last_name: str

    # Contact Fields
    mobile_number: str | None
    email: str | None

    # Address Fields
    street_1: str
    street_2: str | None
    house_number: str | None
    purok: str
    barangay: str
    city: str
    state: str
    zip_code: str

    # Birth Fields
    age: int | None = Field(default=0)
    date_of_birth: datetime
    date_of_death: datetime | None
    gender: PersonGender

    # Relatives Fields
    father_id: int | None = Field(foreign_key="person.id")
    mother_id: int | None = Field(foreign_key="person.id")
    spouse_id: int | None = Field(foreign_key="person.id")

    __table_args__ = (
        Index("ix_person_name", "first_name", "middle_name", "last_name"),
        Index(
            "ix_person_address",
            "street_1",
            "street_2",
            "house_number",
            "purok",
            "barangay",
            "city",
            "state",
            "zip_code",
        ),
    )

from models.base import Base, Field, FieldDefinition
from sqlalchemy import Index, ForeignKey
from datetime import datetime
from enum import Enum


class PersonGender(str, Enum):
    MALE = "male"
    FEMALE = "female"
    UNKNOWN = "unknown"


class Person(Base):
    __tablename__ = "person"

    id: Field[int] = FieldDefinition(primary_key=True, autoincrement=True)

    # Name Fields
    first_name: Field[str]
    middle_name: Field[str | None]
    last_name: Field[str]

    # Contact Fields
    mobile_number: Field[str | None]
    email: Field[str | None]

    # Address Fields
    street_1: Field[str]
    street_2: Field[str | None]
    house_number: Field[str | None]
    purok: Field[str]
    barangay: Field[str]
    city: Field[str]
    state: Field[str]
    zip_code: Field[str]

    # Birth Fields
    age: Field[int] = FieldDefinition(default=0)
    date_of_birth: Field[datetime]
    date_of_death: Field[datetime | None]
    gender: Field[PersonGender]

    # Relatives Fields
    father_id: Field[int | None] = FieldDefinition(ForeignKey("person.id"))
    mother_id: Field[int | None] = FieldDefinition(ForeignKey("person.id"))
    spouse_id: Field[int | None] = FieldDefinition(ForeignKey("person.id"))

    __table_args = (
        Index("ix_name", "first_name", "middle_name", "last_name"),
        Index(
            "ix_address",
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

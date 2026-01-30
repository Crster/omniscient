from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Index
from datetime import datetime
from enum import Enum
from pydantic import computed_field
from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
    from src.models.schema.user import User


class PersonGender(str, Enum):
    MALE = "male"
    FEMALE = "female"
    UNKNOWN = "unknown"


class Person(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    # Name Fields
    first_name: str
    middle_name: str | None = Field(default=None)
    last_name: str

    # Contact Fields
    mobile_number: str | None = Field(default=None, index=True)
    email: str | None = Field(default=None, index=True)

    # Address Fields
    street_1: str
    street_2: str | None = Field(default=None)
    house_number: str | None = Field(default=None)
    purok: str
    barangay: str
    city: str
    state: str
    zip_code: str

    # Birth Fields
    age: int | None = Field(default=0)
    date_of_birth: datetime
    date_of_death: datetime | None = Field(default=None)
    gender: PersonGender

    # Relatives Fields
    father_id: int | None = Field(default=None, foreign_key="person.id")
    mother_id: int | None = Field(default=None, foreign_key="person.id")
    spouse_id: int | None = Field(default=None, foreign_key="person.id")

    # Reference Fields
    user: Optional["User"] = Relationship(back_populates="person")

    # Computed Fields
    @computed_field
    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

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

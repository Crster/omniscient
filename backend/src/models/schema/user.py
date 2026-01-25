from sqlmodel import SQLModel, Field
from sqlalchemy import Index


class User(SQLModel, table=True):
    id: int | None = Field(default=None,primary_key=True)

    # Account Fields
    name: str
    email: str
    password: str

    # Reference Fields
    person_id: int | None = Field(default=None, foreign_key="person.id")

    __table_args__ = (Index("ix_user_account", "name", "email"),)

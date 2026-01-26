from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Index
from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
    from src.models.schema.person import Person
    from src.models.schema.role import Role


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    # Account Fields
    name: str = Field(unique=True, index=True)
    email: str = Field(unique=True, index=True)
    password: str
    person_id: int | None = Field(default=None, foreign_key="person.id")
    role_id: int | None = Field(default=None, foreign_key="role.id")

    # Status Fields
    is_active: bool = Field(default=True)

    # Reference Fields
    person: Optional["Person"] = Relationship(back_populates="user")
    role: Optional["Role"] = Relationship(back_populates="user")

    __table_args__ = (Index("ix_user_account", "name", "email"),)

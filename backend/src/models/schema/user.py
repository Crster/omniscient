from sqlalchemy import Index, ForeignKey

from src.models.base import Base, Field, FieldDefinition, FieldLinkDefinition


class User(Base):
    __tablename__ = "user"

    id: Field[int] = FieldDefinition(primary_key=True, autoincrement=True)

    # Account Fields
    name: Field[str]
    email: Field[str]
    password: Field[str]

    # Reference Fields
    audits = FieldLinkDefinition("Audit", back_populates="created_by")
    person = FieldLinkDefinition("Person", back_populates="users")
    surveyed = FieldLinkDefinition("Voter", back_populates="surveyor")
    person_id: Field[int | None] = FieldDefinition(ForeignKey("person.id"))

    __table_args__ = (Index("ix_user_account", "name", "email"),)

from sqlalchemy import ForeignKey

from src.models.base import Base, Field, FieldDefinition, FieldLinkDefinition


class Voter(Base):
    __tablename__ = "voter"

    id: Field[int] = FieldDefinition(primary_key=True, autoincrement=True)

    # Election Fields
    voter_no: Field[str | None]
    precinct_no: Field[str | None]


    # Reference Fields
    selected_candidates = FieldLinkDefinition("VoterCandidate", back_populates="voter")
    person = FieldLinkDefinition("Person", back_populates="voters")
    surveyor = FieldLinkDefinition("User", back_populates="surveyed")
    person_id: Field[int] = FieldDefinition(ForeignKey("person.id"))
    surveyor_id: Field[int] = FieldDefinition(ForeignKey("user.id"))

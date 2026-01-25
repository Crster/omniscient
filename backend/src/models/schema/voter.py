from sqlalchemy import ForeignKey
from models.base import Base, Field, FieldDefinition


class Voter(Base):
    __tablename__ = "voter"

    id: Field[int] = FieldDefinition(primary_key=True, autoincrement=True)

    # Election Fields
    voter_no: Field[str | None]
    precinct_no: Field[str | None]


    # Reference Fields
    person_id: Field[int] = FieldDefinition(ForeignKey("person.id"))
    surveyor_id: Field[int] = FieldDefinition(ForeignKey("user.id"))

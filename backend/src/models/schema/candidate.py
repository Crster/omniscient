from models.base import Base, Field, FieldDefinition
from sqlalchemy import Index, ForeignKey


class Candidate(Base):
    __tablename__ = "candidate"

    id: Field[int] = FieldDefinition(primary_key=True, autoincrement=True)

    # Name Fields
    first_name: Field[str]
    middle_name: Field[str | None]
    last_name: Field[str]
    alias: Field[str | None]

    # Ballot Fields
    partylist_id: Field[int] = FieldDefinition(ForeignKey("partylist.id"))
    position: Field[int] = FieldDefinition(ForeignKey("position.id"))
    balot_no: Field[int]

    __table_args__ = (
        Index("ix_name", "first_name", "middle_name", "last_name", "alias"),
    )

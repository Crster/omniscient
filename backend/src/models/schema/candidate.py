from sqlalchemy import Index
from sqlmodel import SQLModel, Field


class Candidate(SQLModel, table=True):
    id: int | None = Field(primary_key=True)

    # Name Fields
    first_name: str
    middle_name: str | None
    last_name: str
    alias: str | None

    # Ballot Fields
    partylist_id: int = Field(foreign_key="partylist.id")
    position_id: int = Field(foreign_key="position.id")
    balot_no: int

    __table_args__ = (
        Index("ix_candidate_name", "first_name", "middle_name", "last_name", "alias"),
    )

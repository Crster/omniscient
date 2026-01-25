from sqlmodel import SQLModel, Field


class VoterCandidate(SQLModel, table=True):
    id: int | None = Field(primary_key=True)

    # Reference Fields
    voter_id: int = Field(foreign_key="voter.id")
    position_id: int = Field(foreign_key="position.id")
    candidate_id: int = Field(foreign_key="candidate.id")
    rating: int = Field(default=0)

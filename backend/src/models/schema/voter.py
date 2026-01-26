from sqlmodel import SQLModel, Field


class Voter(SQLModel, table=True):
    id: int | None = Field(primary_key=True)

    # Election Fields
    voter_no: str | None = Field(unique=True, index=True)
    precinct_no: str | None

    # Reference Fields
    person_id: int = Field(foreign_key="person.id")
    surveyor_id: int = Field(foreign_key="user.id")

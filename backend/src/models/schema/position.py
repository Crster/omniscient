from sqlmodel import SQLModel, Field


class Position(SQLModel, table=True):
    id: int | None = Field(primary_key=True)

    # Ballot Field
    description: str
    min_seat: int
    max_seat: int
    sort_index: int

    # Status Field
    is_active: bool | None = Field(default=True)

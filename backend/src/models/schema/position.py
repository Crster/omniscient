from sqlmodel import SQLModel, Field


class Position(SQLModel, table=True):
    id: int | None = Field(primary_key=True)

    # Ballot Field
    code: str = Field(unique=True, index=True)
    name: str
    min_seat: int
    max_seat: int
    sort_index: int

    # Status Field
    is_active: bool | None = Field(default=True)

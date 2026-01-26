from sqlmodel import SQLModel, Field
from datetime import datetime


class Partylist(SQLModel, table=True):
    id: int | None = Field(primary_key=True)

    # General Field
    name: str = Field(unique=True, index=True)
    note: str
    lead_id: int | None = Field(foreign_key="person.id")

    registered_at: datetime | None

    # Status Field
    is_active: bool | None = Field(default=True)

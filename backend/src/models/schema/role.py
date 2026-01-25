from sqlmodel import SQLModel, Field
from sqlalchemy import Column, JSON
from typing import List

class Role(SQLModel, table=True):
    id: int = Field(primary_key=True)

    # General Fields
    description: str
    permissions: List[str] = Field(sa_column=Column(JSON))

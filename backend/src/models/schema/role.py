from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, JSON
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from src.models.schema.user import User

class Role(SQLModel, table=True):
    id: int = Field(primary_key=True)

    # General Fields
    code: str = Field(unique=True, index=True)
    name: str
    permissions: List[str] = Field(sa_column=Column(JSON))
    
    # Reference Fields
    user: List["User"] = Relationship(back_populates="role")

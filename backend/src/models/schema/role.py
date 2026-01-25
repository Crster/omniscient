from sqlalchemy import JSON
from typing import List

from src.models.base import Base, Field, FieldDefinition

class Role(Base):
    __tablename__ = "role"

    id: Field[int] = FieldDefinition(primary_key=True, autoincrement=True)

    # General Fields
    description: Field[str]
    permissions: Field[List[str]] = FieldDefinition(JSON)

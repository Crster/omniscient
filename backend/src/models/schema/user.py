from models.base import Base, Field, FieldDefinition
from sqlalchemy import Index, ForeignKey

class User(Base):
    __tablename__ = "user"

    id: Field[int] = FieldDefinition(primary_key=True, autoincrement=True)
    
    # Account Fields
    name: Field[str]
    email: Field[str]
    password: Field[str]
    
    # Reference Fields
    person_id: Field[int | None] = FieldDefinition(ForeignKey("person.id"))
    
    __table_args = (
        Index("ix_account", "name", "email"),
    )
from sqlalchemy import ForeignKey
from datetime import datetime

from src.models.base import Base, Field, FieldDefinition, FieldLinkDefinition


class Partylist(Base):
    __tablename__ = "partylist"

    id: Field[int] = FieldDefinition(primary_key=True, autoincrement=True)

    # General Field
    name: Field[str]
    lead_id: Field[int | None] = FieldDefinition(ForeignKey("person.id"))

    registered_at: Field[datetime | None]

    # Status Field
    is_active: Field[bool] = FieldDefinition(default=True)
    
    # Reference Fields
    lead = FieldLinkDefinition("Person", back_populates="leads")
    candidates = FieldLinkDefinition("Candidate", back_populates="partylist")
    

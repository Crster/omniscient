from models.base import Base, Field, FieldDefinition
from sqlalchemy import ForeignKey
from datetime import datetime


class Partylist(Base):
    __tablename__ = "partylist"

    id: Field[int] = FieldDefinition(primary_key=True, autoincrement=True)

    # General Field
    name: Field[str]
    lead_id: Field[int | None] = FieldDefinition(ForeignKey("person.id"))

    registered_at: Field[datetime | None]

    # Status Field
    is_active: Field[bool] = FieldDefinition(default=True)

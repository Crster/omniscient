from models.base import Base, Field, FieldDefinition
from sqlalchemy import Index, ForeignKey
from datetime import datetime
from enum import Enum
from uuid import uuid4


class AuditAction(str, Enum):
    CREATE = "create"
    UPDATE = "update"
    DELETE = "delete"


class Audit(Base):
    __tablename__ = "audit"
    
    id: Field[str] = FieldDefinition(primary_key=True, default=lambda: str(uuid4()))

    # Payload Fields
    type: Field[str]
    payload: Field[str | None]
    action: Field[AuditAction]
    log: Field[str | None]

    # Audit Fields
    created_by: Field[int | None] = FieldDefinition(ForeignKey("user.id"))
    created_at: Field[datetime | None]

    __table_args__ = (Index("ix_type_action", "type", "action"),)

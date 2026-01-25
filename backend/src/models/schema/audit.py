from sqlalchemy import Index, ForeignKey
from datetime import datetime
from enum import Enum

from src.models.base import Base, Field, FieldDefinition


class AuditAction(str, Enum):
    CREATE = "create"
    UPDATE = "update"
    DELETE = "delete"


class Audit(Base):
    __tablename__ = "audit"

    id: Field[str] = FieldDefinition(primary_key=True)

    # Payload Fields
    type: Field[str]
    payload: Field[str | None]
    action: Field[AuditAction]
    log: Field[str | None]

    # Audit Fields
    created_by_id: Field[int | None] = FieldDefinition(ForeignKey("user.id"))
    created_at: Field[datetime | None]

    __table_args__ = (Index("ix_audit_type_action", "type", "action"),)

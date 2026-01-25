from sqlalchemy import Index, ForeignKey
from datetime import datetime
from enum import Enum
from uuid import uuid4

from src.models.base import Base, Field, FieldDefinition, FieldLinkDefinition


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
    created_by_id: Field[int | None] = FieldDefinition(ForeignKey("user.id"))
    created_at: Field[datetime | None]

    # Reference Fields
    created_by = FieldLinkDefinition("User", back_populates="audits")

    __table_args__ = (Index("ix_audit_type_action", "type", "action"),)

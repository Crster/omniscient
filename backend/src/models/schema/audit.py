from sqlmodel import SQLModel, Field
from sqlalchemy import Index, Column, JSON
from typing import Any
from datetime import datetime
from enum import Enum


class AuditAction(str, Enum):
    CREATE = "create"
    UPDATE = "update"
    DELETE = "delete"


class Audit(SQLModel, table=True):
    id: str = Field(primary_key=True)

    # Payload Fields
    type: str
    payload: dict[str, Any] | None = Field(sa_column=Column(JSON))
    action: AuditAction
    log: str | None

    # Audit Fields
    created_by_id: int | None = Field(foreign_key="user.id")
    created_at: datetime | None

    __table_args__ = (Index("ix_audit_type_action", "type", "action"),)

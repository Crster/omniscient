from datetime import datetime
from uuid import uuid4
from typing import Any

from src.helpers.database import DatabaseSessionDep, Annotated, Depends
from src.models.schema.audit import Audit, AuditAction
from src.models.schema.user import User


class AuditService:
    user: User | None

    def __init__(self, session: DatabaseSessionDep):
        self.user = None
        self.session = session

    def add(
        self,
        type: str,
        action: AuditAction,
        log: str | None = None,
        payload: dict[str, Any] | None = None,
    ):
        audit = Audit(
            id=str(uuid4()),
            type=type,
            action=action,
            payload=payload,
            log=log,
            created_by_id=self.user.id if self.user is not None else None,
            created_at=datetime.utcnow(),
        )

        self.session.add(audit)
        self.session.commit()

        return audit.id

    def addCreateAction(
        self, type: str, log: str | None = None, payload: dict[str, Any] | None = None
    ):
        return self.add(type, AuditAction.CREATE, log, payload)

    def addUpdateAction(
        self, type: str, log: str | None = None, payload: dict[str, Any] | None = None
    ):
        return self.add(type, AuditAction.UPDATE, log, payload)

    def addDeleteAction(
        self, type: str, log: str | None = None, payload: dict[str, Any] | None = None
    ):
        return self.add(type, AuditAction.DELETE, log, payload)


AuditServiceDep = Annotated[AuditService, Depends(AuditService)]

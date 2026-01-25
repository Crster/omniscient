from sqlmodel import SQLModel
from datetime import datetime
from uuid import uuid4

from src.helpers.database import DatabaseSessionDep, Annotated, Depends
from src.models.schema.audit import Audit, AuditAction
from src.models.schema.user import User


class AuditService:
    user: User | None

    def __init__(self, session: DatabaseSessionDep):
        self.user = None
        self.session = session

    def add(
        self, type: str, action: AuditAction, payload: SQLModel | None, log: str | None
    ):
        payload_map = payload.model_dump() if payload is not None else None
        
        audit = Audit(
            id=str(uuid4()),
            type=type,
            action=action,
            payload=payload_map,
            log=log,
            created_by_id=self.user.id if self.user is not None else None,
            created_at=datetime.utcnow(),
        )

        self.session.add(audit)

        return audit.id

    def addCreateAction(self, type: str, log: str | None = None, payload: SQLModel | None = None):
        return self.add(type, AuditAction.CREATE, payload, log)

    def addUpdateAction(self, type: str, log: str | None = None, payload: SQLModel | None = None):
        return self.add(type, AuditAction.UPDATE, payload, log)

    def addDeleteAction(self, type: str, log: str | None = None, payload: SQLModel | None = None):
        return self.add(type, AuditAction.DELETE, payload, log)


AuditServiceDep = Annotated[AuditService, Depends(AuditService)]

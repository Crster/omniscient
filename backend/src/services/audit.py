from pydantic import BaseModel
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

    def __add_audit(
        self, type: str, action: AuditAction, payload: BaseModel | None, log: str | None
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

        return audit.id

    def create(self, type: str, log: str | None = None, payload: BaseModel | None = None):
        return self.__add_audit(type, AuditAction.CREATE, payload, log)

    def update(self, type: str, log: str | None = None, payload: BaseModel | None = None):
        return self.__add_audit(type, AuditAction.UPDATE, payload, log)

    def delete(self, type: str, log: str | None = None, payload: BaseModel | None = None):
        return self.__add_audit(type, AuditAction.DELETE, payload, log)


AuditServiceDep = Annotated[AuditService, Depends(AuditService)]

from datetime import datetime

from src.helpers.database import DatabaseSessionDep, Annotated, Depends
from src.models.base import Base
from src.models.schema.audit import Audit, AuditAction
from src.models.schema.user import User


class AuditService:
    user: User | None

    def __init__(self, session: DatabaseSessionDep):
        self.user = None
        self.session = session

    def __add_audit(
        self, type: str, action: AuditAction, payload: Base | None, log: str | None
    ):
        payload_str = payload.to_json() if payload is not None else None

        audit = Audit(
            type=type,
            action=action,
            payload=payload_str,
            log=log,
            created_by=self.user.id if self.user is not None else None,
            created_at=datetime.utcnow(),
        )

        self.session.add(audit)

        return audit.id

    def create(self, type: str, log: str | None = None, payload: Base | None = None):
        return self.__add_audit(type, AuditAction.CREATE, payload, log)

    def update(self, type: str, log: str | None = None, payload: Base | None = None):
        return self.__add_audit(type, AuditAction.UPDATE, payload, log)

    def delete(self, type: str, log: str | None = None, payload: Base | None = None):
        return self.__add_audit(type, AuditAction.DELETE, payload, log)


AuditServiceDep = Annotated[AuditService, Depends(AuditService)]

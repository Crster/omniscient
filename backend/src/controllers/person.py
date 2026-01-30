from fastapi import APIRouter, status

from src.helpers.database import DatabaseSessionDep
from src.services.audit import AuditServiceDep
from src.services.person import PersonServiceDep
from src.dto.person import NewPersonDto

router = APIRouter(prefix="/person", tags=["Person"])


@router.post("/", summary="Register a new person", status_code=status.HTTP_201_CREATED)
async def create_person(
    session: DatabaseSessionDep,
    audit_service: AuditServiceDep,
    person_service: PersonServiceDep,
    new_person: NewPersonDto,
):
    try:
        person = person_service.add(new_person)
        audit_id = audit_service.addCreateAction(
            "person",
            "created new person",
            person.model_dump(include={"first_name", "last_name", "barangay"}),
        )

        session.commit()

        return audit_id
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()

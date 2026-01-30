from fastapi import APIRouter, status

from src.helpers.database import DatabaseSessionDep
from src.services.audit import AuditServiceDep
from src.services.user import UserServiceDep

from src.dto.user import NewUserDto, UserMasterList


router = APIRouter(prefix="/user", tags=["User"])


@router.post("/", summary="Register a new user", status_code=status.HTTP_201_CREATED)
async def create_user(
    session: DatabaseSessionDep,
    audit_service: AuditServiceDep,
    user_service: UserServiceDep,
    new_user: NewUserDto,
):
    try:
        user = user_service.add(new_user)
        audit_id = audit_service.addCreateAction(
            "user",
            "created new user",
            user.model_dump(include={"name", "email", "role_id"}),
        )

        session.commit()

        return audit_id
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()


@router.get("/", summary="List paginated user for main view")
async def list_user(user_service: UserServiceDep) -> list[UserMasterList]:
    return user_service.generate_masterlist()

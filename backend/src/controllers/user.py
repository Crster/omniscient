from glom import glom
from fastapi import APIRouter, status

from src.helpers.database import DatabaseSessionDep
from src.services.audit import AuditServiceDep
from src.services.user import UserServiceDep

from src.dto.user import CreateUserDto, UserListForMainView


router = APIRouter(
    prefix="/user",
    tags=["user"],
    responses={404: {"description": "Not found"}},
)


@router.post("/", summary="Create a new user", status_code=status.HTTP_201_CREATED)
async def create_user(
    session: DatabaseSessionDep,
    audit_service: AuditServiceDep,
    user_service: UserServiceDep,
    user_dto: CreateUserDto,
):
    user = user_service.add(user_dto.name, user_dto.email, user_dto.password)
    session.commit()
    session.refresh(user)

    audit_id = audit_service.addCreateAction(
        "user", "create new user from endpoint", user.model_dump(exclude={"password"})
    )

    return audit_id


@router.get("/", summary="Get all users")
async def list_users(user_service: UserServiceDep) -> list[UserListForMainView]:
    ret: list[UserListForMainView] = []
    results = user_service.list_for_mainview()

    for result in results:
        if result.id is None:
            continue

        ret.append(
            UserListForMainView(
                user_id=result.id,
                role=glom(result, "role.description", default=None),
                name=glom(result, "person.full_name", default=None) or result.name or result.email,
                barangay=glom(result, "person.barangay", default=None),
                status="active" if result.is_active else "inactive",
            )
        )

    return ret

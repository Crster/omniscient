from fastapi import APIRouter, status
from typing import Sequence

from src.helpers.database import DatabaseSessionDep
from src.services.audit import AuditServiceDep
from src.services.user import UserServiceDep

from src.dto.user import CreateUserDto
from src.models.schema.user import User


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
    audit_id = audit_service.addCreateAction("user", "create new user from endpoint", user)
    session.commit()

    return audit_id


@router.get("/", summary="Get all users")
async def list_users(user_service: UserServiceDep) -> Sequence[User]:
    return user_service.list_all()

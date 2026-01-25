from fastapi import APIRouter, status
from services.audit import AuditServiceDep
from services.user import UserServiceDep
from dto.user import CreateUserDto

router = APIRouter(
    prefix="/user",
    tags=["user"],
    responses={404: {"description": "Not found"}},
)


@router.post("/", summary="Create a new user", status_code=status.HTTP_201_CREATED)
async def create_user(
    audit_service: AuditServiceDep,
    user_service: UserServiceDep,
    user_dto: CreateUserDto,
):
    audit_id = audit_service.create("user", "create new user from endpoint")
    user_service.create(user_dto.name, user_dto.email, user_dto.password)

    return audit_id


@router.get("/", summary="Get all users")
async def list_users(user_service: UserServiceDep):
    return user_service.list_all()

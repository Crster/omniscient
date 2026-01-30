from glom import glom
from sqlmodel import select, asc

from src.helpers.database import DatabaseSessionDep, Annotated, Depends
from src.helpers.exception import EntityNotFoundError, EntityAlreadyExistsError
from src.models.schema.user import User
from src.models.schema.role import Role

from src.dto.user import NewUserDto, UserMasterList


class UserService:
    def __init__(self, session: DatabaseSessionDep):
        self.session = session

    def add(self, new_user: NewUserDto):
        temporary_password = "0101"

        if self.session.get(Role, new_user.role_id) is None:
            raise EntityNotFoundError("role", new_user.role_id)

        if (
            self.session.exec(
                select(User).where(
                    User.name == new_user.name or User.email == new_user.email
                )
            ).first()
            is not None
        ):
            raise EntityAlreadyExistsError("user", new_user.name)

        user = User(
            name=new_user.name,
            email=new_user.email,
            password=temporary_password,
            role_id=new_user.role_id,
        )

        self.session.add(user)
        return user

    def generate_masterlist(self):
        ret: list[UserMasterList] = []

        users = self.session.exec(select(User).order_by(asc(User.id)))

        for result in users:
            if result.id is None:
                continue

            ret.append(
                UserMasterList(
                    user_id=result.id,
                    role=glom(result, "role.name", default=None),
                    name=glom(result, "person.full_name", default=None)
                    or result.name
                    or result.email,
                    barangay=glom(result, "person.barangay", default=""),
                    status="active" if result.is_active else "inactive",
                )
            )

        return ret


UserServiceDep = Annotated[UserService, Depends(UserService)]

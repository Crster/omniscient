from sqlmodel import select

from src.helpers.database import DatabaseSessionDep, Annotated, Depends
from src.models.schema.user import User


class UserService:
    def __init__(self, session: DatabaseSessionDep):
        self.session = session

    def create(self, name: str, email: str, password: str):
        user = User(
            name=name,
            email=email,
            password=password,
        )

        self.session.add(user)

    def list_all(self):
        return self.session.exec(select(User)).all()


UserServiceDep = Annotated[UserService, Depends(UserService)]

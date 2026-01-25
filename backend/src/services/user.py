from sqlmodel import select
from bcrypt import hashpw, gensalt

from src.helpers.database import DatabaseSessionDep, Annotated, Depends
from src.models.schema.user import User


class UserService:
    def __init__(self, session: DatabaseSessionDep):
        self.session = session

    def create(self, name: str, email: str, password: str):
        user = User(
            name=name,
            email=email,
            password=hashpw(password.encode("utf-8"), gensalt()).decode("utf-8"),
        )

        self.session.add(user)

    def list_all(self):
        return self.session.exec(select(User)).all()


UserServiceDep = Annotated[UserService, Depends(UserService)]

from sqlmodel import select, asc
from bcrypt import hashpw, gensalt

from src.helpers.database import DatabaseSessionDep, Annotated, Depends
from src.models.schema.user import User


class UserService:
    def __init__(self, session: DatabaseSessionDep):
        self.session = session

    def add(self, name: str, email: str, password: str):
        user = User(
            name=name,
            email=email,
            password=hashpw(password.encode("utf-8"), gensalt()).decode("utf-8"),
        )

        self.session.add(user)
        return user

    def list_for_mainview(self):
        return self.session.exec(select(User).order_by(asc(User.id)))


UserServiceDep = Annotated[UserService, Depends(UserService)]

from sqlalchemy import select

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
        results = self.session.execute(select(User)).all()
        return [result._asdict() for result in results]


UserServiceDep = Annotated[UserService, Depends(UserService)]

from sqlalchemy import select
from helpers.database import DatabaseSessionDep, Annotated, Depends
from models.schema.user import User


class UserService:
    def __init__(self, session: DatabaseSessionDep):
        self.session = session

    def create(self, name: str, email: str, password: str):
        user = User(
            name=name,
            email=email,
            password=password,
            person_id=None,
        )

        self.session.add(user)
        self.session.commit()

    def list_all(self):
        return self.session.execute(select(User)).all()


UserServiceDep = Annotated[UserService, Depends(UserService)]

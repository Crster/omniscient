from fastapi import Depends
from typing import Annotated

from src.dto.auth import AuthUser


class AuthService:
    def get_current_user(self):
        user = AuthUser(user_id=1)
        return user


AuthServiceDep = Annotated[AuthService, Depends(AuthService)]

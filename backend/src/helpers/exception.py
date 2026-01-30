from typing import Any
from fastapi import status


class ServiceException(Exception):
    """Base exception for all service-related errors."""

    def __init__(self, message: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.status_code = status_code


class EntityNotFoundError(ServiceException):
    def __init__(self, entity: str, entity_id: Any):
        super().__init__(
            message=f"{entity}({entity_id}) was not found.",
            status_code=status.HTTP_404_NOT_FOUND,
        )


class EntityAlreadyExistsError(ServiceException):
    def __init__(self, entity: str, entity_id: Any):
        super().__init__(
            message=f"{entity}({entity_id}) already exists.",
            status_code=status.HTTP_409_CONFLICT,
        )


class PermissionDeniedError(ServiceException):
    def __init__(self, message: str = "Action not allowed"):
        super().__init__(message=message, status_code=status.HTTP_403_FORBIDDEN)

from sqlmodel import create_engine, Session
from typing import Annotated
from fastapi import Depends

from src.helpers import config
import src.models.metadata  # noqa: F401


engine = create_engine(config.db_url(), connect_args=config.db_config())


def get_session():
    with Session(engine) as session:
        yield session


DatabaseSessionDep = Annotated[Session, Depends(get_session)]

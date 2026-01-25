from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from typing import Annotated
from fastapi import Depends
from helpers import config


engine = create_engine(config.db_url(), connect_args=config.db_config())

def get_session():
  with Session(engine) as session:
    yield session
    
DatabaseSessionDep = Annotated[Session, Depends(get_session)]
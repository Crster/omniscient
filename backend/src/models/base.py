from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped, mapped_column, relationship
from uuid import UUID
from datetime import datetime
from json import dumps

Field = Mapped
FieldDefinition = mapped_column
FieldLinkDefinition = relationship


class Base(DeclarativeBase):
    def to_json(self):
        def extended_encoder(x):
            if isinstance(x, datetime):
                return x.isoformat()
            if isinstance(x, UUID):
                return str(x)

        return dumps(self.__dict__, default=extended_encoder)

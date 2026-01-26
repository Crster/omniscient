from sqlmodel import SQLModel

from src.models.schema.user import User
from src.models.schema.person import Person
from src.models.schema.role import Role
from src.models.schema.audit import Audit
from src.models.schema.partylist import Partylist
from src.models.schema.position import Position
from src.models.schema.candidate import Candidate
from src.models.schema.voter import Voter
from src.models.schema.voter_candidate import VoterCandidate

NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

SQLModel.metadata.naming_convention = NAMING_CONVENTION

model_metadata = SQLModel.metadata
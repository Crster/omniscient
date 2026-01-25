from src.models.base import Base
from src.models.schema.user import User
from src.models.schema.person import Person
from src.models.schema.role import Role
from src.models.schema.audit import Audit
from src.models.schema.partylist import Partylist
from src.models.schema.position import Position
from src.models.schema.candidate import Candidate
from src.models.schema.voter import Voter
from src.models.schema.voter_candidate import VoterCandidate

model_metadata = Base.metadata
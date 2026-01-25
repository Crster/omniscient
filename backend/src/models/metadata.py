from models.base import Base
from models.schema.user import User
from models.schema.person import Person
from models.schema.role import Role
from models.schema.audit import Audit
from models.schema.partylist import Partylist
from models.schema.position import Position
from models.schema.candidate import Candidate
from models.schema.voter import Voter
from models.schema.voter_candidate import VoterCandidate

model_metadata = Base.metadata
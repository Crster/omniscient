from sqlalchemy import ForeignKey

from src.models.base import Base, Field, FieldDefinition

class VoterCandidate(Base):
    __tablename__ = "voter_candidate"

    id: Field[int] = FieldDefinition(primary_key=True, autoincrement=True)

    # Reference Fields
    voter_id: Field[int] = FieldDefinition(ForeignKey("voter.id"))
    position_id: Field[int] = FieldDefinition(ForeignKey("position.id"))
    candidate_id: Field[int] = FieldDefinition(ForeignKey("candidate.id"))
    rating: Field[int] = FieldDefinition(default=0)
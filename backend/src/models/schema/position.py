from src.models.base import Base, Field, FieldDefinition, FieldLinkDefinition


class Position(Base):
    __tablename__ = "position"

    id: Field[int] = FieldDefinition(primary_key=True, autoincrement=True)

    # Ballot Field
    description: Field[str]
    min_seat: Field[int]
    max_seat: Field[int]
    sort_index: Field[int]

    # Status Field
    is_active: Field[bool] = FieldDefinition(default=True)
    
    # Reference Field
    candidates = FieldLinkDefinition("Candidate", back_populates="position")

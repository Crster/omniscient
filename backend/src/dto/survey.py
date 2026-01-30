from pydantic import BaseModel
from typing import List

class CandidateRatingDto(BaseModel):
    candidate_id: int
    position_id: int
    rating: int

class NewSurveyDto(BaseModel):
    person_id: int
    
    voter_no: str | None
    precinct_no: str | None
    
    ratings: List[CandidateRatingDto]
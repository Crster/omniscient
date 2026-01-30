from glom import glom
from src.helpers.database import DatabaseSessionDep, Annotated, Depends
from src.helpers.exception import EntityNotFoundError

from src.models.schema.person import Person
from src.models.schema.voter import Voter
from src.models.schema.candidate import Candidate
from src.models.schema.position import Position
from src.models.schema.voter_candidate import VoterCandidate

from src.dto.auth import AuthUser
from src.dto.survey import NewSurveyDto


class SurveyService:
    def __init__(self, session: DatabaseSessionDep):
        self.session = session

    def add(self, surveyor: AuthUser, new_survey: NewSurveyDto):
        if self.session.get(Person, new_survey.person_id) is None:
            raise EntityNotFoundError("person", new_survey.person_id)

        voter = Voter(
            person_id=new_survey.person_id,
            surveyor_id=glom(surveyor, "user_id"),
            voter_no=new_survey.voter_no,
            precinct_no=new_survey.precinct_no,
        )

        self.session.add(voter)
        self.session.flush()

        for rating in new_survey.ratings:
            if self.session.get(Candidate, rating.candidate_id) is None:
                raise EntityNotFoundError("candidate", rating.candidate_id)
            
            if self.session.get(Position, rating.position_id) is None:
                raise EntityNotFoundError("position", rating.position_id)
            
            voter_candidate = VoterCandidate(
                voter_id=glom(voter, "id"),
                position_id=rating.position_id,
                candidate_id=rating.candidate_id,
                rating=rating.rating,
            )
            self.session.add(voter_candidate)

        return voter


SurveyServiceDep = Annotated[SurveyService, Depends(SurveyService)]

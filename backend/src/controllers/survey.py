from fastapi import APIRouter, status

from src.helpers.database import DatabaseSessionDep

from src.services.auth import AuthServiceDep
from src.services.audit import AuditServiceDep
from src.services.survey import SurveyServiceDep

from src.dto.survey import NewSurveyDto

router = APIRouter(prefix="/survey", tags=["Survey"])


@router.post("/", summary="Create a new survey", status_code=status.HTTP_201_CREATED)
async def create_survey(session: DatabaseSessionDep, auth: AuthServiceDep, audit_service: AuditServiceDep, survey_service: SurveyServiceDep, new_survey: NewSurveyDto):
    try:
        survey_service.add(auth.get_current_user(), new_survey)
        
        audit_id = audit_service.addCreateAction("survey", "created new survey", new_survey.model_dump())
        
        session.commit()
        
        return audit_id
        
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()

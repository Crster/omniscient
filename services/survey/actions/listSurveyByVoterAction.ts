import { SurveyRepository } from "../repository";
import { listSurveyByVoterRequest } from "../requests/listSurveyByVoterRequest";

export async function listSurveyByVoterAction(request: listSurveyByVoterRequest) {
  const surveyRepo = new SurveyRepository();
  const result = await surveyRepo.getListByCandidateAndVoters(request.candidateId, request.voterId);

  return result;
}

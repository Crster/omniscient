import { SurveyRepository } from "../repository";
import { addSurveyRequest } from "../requests/addSurveyRequest";

export async function addSurveyAction(request: addSurveyRequest) {
  const surveyRepo = new SurveyRepository();
  const result = await surveyRepo.create(request);

  return result;
}

import { Survey } from "../model";

export function createSurveyListAsMap(surveys: Array<Survey>) {
  const ret = new Map<string, Survey>();

  for (const survey of surveys) {
    ret.set(survey.surveyId, survey);
  }

  return ret;
}

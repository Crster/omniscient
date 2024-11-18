import { SurveyStatus } from "../survey-status/model";

export interface ISurvey {
  voter: { voterId: string; name: string };
  surveyor: { userId: string; name: string };
  validator: { userId: string; name: string };
  candidate: { candidateId: string; name: string };
  status: SurveyStatus;
}

export interface Survey extends ISurvey {
  surveyId: string;
}

export interface SurveyDto {
  voterId: string;
  candidateId: string;
  candidate: string;
  status: SurveyStatus;
  surveyor: string;
  validator: string;
}

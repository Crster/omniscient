import { apiHandler } from "@/libraries/ApiHandler";
import { listSurveyByVoterAction } from "@/services/survey/actions/listSurveyByVoterAction";
import { Survey } from "@/services/survey/model";
import { createSurveyListAsMap } from "@/services/survey/presenters/createSurveyListAsMap";
import { createListSurveyByVoterRequest } from "@/services/survey/requests/listSurveyByVoterRequest";
import { listVoterAction } from "@/services/voter/actions/listVoterAction";
import { createVoterListPresenter } from "@/services/voter/presenters/createVoterListPresenter";
import { createListVoterRequest } from "@/services/voter/requests/listVoterRequest";

export default apiHandler(async (req) => {
  const request = createListVoterRequest(req.value);
  const voters = await listVoterAction(request);

  let surveys: Array<Survey> = [];

  if (req.value.candidateId) {
    const surveyRequest = createListSurveyByVoterRequest({
      candidateId: req.value.candidateId,
      voterId: voters.map((ii) => ii.voterId),
    });

    surveys = await listSurveyByVoterAction(surveyRequest);
  }
  const surveyMap = createSurveyListAsMap(surveys);

  return createVoterListPresenter(voters, surveyMap);
});

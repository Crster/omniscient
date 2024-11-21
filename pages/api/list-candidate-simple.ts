import { apiHandler } from "@/libraries/ApiHandler";
import { listCandidateByPositionAction } from "@/services/candidate/actions/listCandidateByPositionAction";
import { createCandidateListSimplePresenter } from "@/services/candidate/presenters/createCandidateListSimplePresenter";
import { createListCandidateByPositionRequest } from "@/services/candidate/requests/listCandidateByPositionRequest";

export default apiHandler(async (req) => {
  const request = createListCandidateByPositionRequest(req.value);
  const candidates = await listCandidateByPositionAction(request);

  return createCandidateListSimplePresenter(candidates);
});

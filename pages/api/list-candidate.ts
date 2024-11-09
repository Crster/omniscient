import { apiHandler } from "@/libraries/ApiHandler";
import { listCandidateAction } from "@/services/candidate/actions/listCandidateAction";
import { createCandidateListPresenter } from "@/services/candidate/presenters/createCandidateListPresenter";
import { createListCandidateRequest } from "@/services/candidate/requests/listCandidateRequest";

export default apiHandler(async (req) => {
  const request = createListCandidateRequest(req.value);
  const candidates = await listCandidateAction(request);

  return createCandidateListPresenter(candidates);
});

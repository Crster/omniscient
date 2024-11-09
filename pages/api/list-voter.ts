import { apiHandler } from "@/libraries/ApiHandler";
import { listVoterAction } from "@/services/voter/actions/listVoterAction";
import { createVoterListPresenter } from "@/services/voter/presenters/createVoterListPresenter";
import { createListVoterRequest } from "@/services/voter/requests/listVoterRequest";

export default apiHandler(async (req) => {
  const request = createListVoterRequest(req.value);
  const voters = await listVoterAction(request);

  return createVoterListPresenter(voters);
});

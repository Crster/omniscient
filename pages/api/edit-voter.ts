import { apiHandler } from "@/libraries/ApiHandler";
import { editVoterAction } from "@/services/voter/actions/editVoterAction";
import { createEditVoterRequest } from "@/services/voter/requests/editVoterRequest";

export default apiHandler(async (req) => {
  const request = createEditVoterRequest({ voterId: req.key as string, voter: req.value });

  await editVoterAction(request);
});

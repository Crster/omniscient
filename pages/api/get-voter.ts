import { apiHandler } from "@/libraries/ApiHandler";
import { getVoterAction } from "@/services/voter/actions/getVoterAction";
import { createGetVoterRequest } from "@/services/voter/requests/getVoterRequest";

export default apiHandler(async (req) => {
  const request = createGetVoterRequest({ voterId: req.key as string });
  const voter = await getVoterAction(request);

  return voter;
});

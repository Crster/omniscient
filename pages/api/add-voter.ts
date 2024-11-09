import { apiHandler } from "@/libraries/ApiHandler";
import { addVoterAction } from "@/services/voter/actions/addVoterAction";
import { createAddVoterRequest } from "@/services/voter/requests/addVoterRequest";

export default apiHandler(async (req) => {
  const request = createAddVoterRequest(req.value as any);
  const voterId = await addVoterAction(request);

  return voterId;
});

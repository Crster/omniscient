import { apiHandler } from "@/libraries/ApiHandler";
import { addCandidateAction } from "@/services/candidate/actions/addCandidateAction";
import { createAddCandidateRequest } from "@/services/candidate/requests/addCandidateRequest";

export default apiHandler(async (req) => {
  const request = createAddCandidateRequest(req.value);
  const candidateId = await addCandidateAction(request);

  return candidateId;
});

import { apiHandler } from "@/libraries/ApiHandler";
import { getCandidateAction } from "@/services/candidate/actions/getCandidateAction";
import { createGetCandidateRequest } from "@/services/candidate/requests/getCandidateRequest";

export default apiHandler(async (req) => {
  const request = createGetCandidateRequest({ candidateId: req.key as string });
  const candidate = await getCandidateAction(request);

  return candidate;
});

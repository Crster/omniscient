import { apiHandler } from "@/libraries/ApiHandler";
import { CandidateList } from "@/services/CandidateList";

export default apiHandler(async () => {
  const candidates = await CandidateList.getList();

  return candidates;
});

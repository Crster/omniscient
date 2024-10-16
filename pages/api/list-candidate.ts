import { apiHandler } from "@/libraries/ApiHandler";
import { CandidateList } from "@/models/CandidateList";

export default apiHandler(async () => {
  const candidates = await CandidateList.generate();

  return candidates;
});

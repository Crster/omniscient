import { apiHandler } from "@/libraries/ApiHandler";
import { VoterList } from "@/services/VoterList";

export default apiHandler(async () => {
  const voters = await VoterList.getList();

  return voters;
});

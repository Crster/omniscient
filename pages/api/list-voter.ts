import { apiHandler } from "@/libraries/ApiHandler";
import { VoterList } from "@/models/VoterList";

export default apiHandler(async () => {
  const voters = await VoterList.generate();

  return voters;
});

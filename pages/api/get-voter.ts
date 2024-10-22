import { apiHandler } from "@/libraries/ApiHandler";
import { Voter } from "@/services/Voter/Voter";

export default apiHandler(async (req) => {
  const voter = await Voter.getById(req.key as string);

  return voter;
});

import { apiHandler } from "@/libraries/ApiHandler";
import { Voter } from "@/models/Voter";

export default apiHandler(async (req) => {
  const voter = await Voter.getById(req.key as string);

  return voter;
});

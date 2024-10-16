import { apiHandler } from "@/libraries/ApiHandler";
import { NotCreatedError } from "@/libraries/Error";
import { Voter } from "@/models/Voter";

export default apiHandler(async (req) => {
  const voterId = await Voter.save(req.value);

  if (!voterId) throw new NotCreatedError("Voter is not created", { voterId });

  return voterId;
});

import { apiHandler } from "@/libraries/ApiHandler";
import { NotCreatedError } from "@/libraries/Error";
import { Candidate } from "@/models/Candidate";

export default apiHandler(async (req) => {
  const candidateId = await Candidate.save(req.value);

  if (!candidateId) throw new NotCreatedError("Candidate is not created", { candidateId });

  return candidateId;
});

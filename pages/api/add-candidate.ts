import { apiHandler } from "@/libraries/ApiHandler";
import { BadRequestError, NotCreatedError } from "@/libraries/Error";
import { Candidate } from "@/services/Candidate";

export default apiHandler<Candidate, void>(async (req) => {
  if (!req.value) throw new BadRequestError("Value is required", { value: "required" });

  const candidateId = await Candidate.create(req.value);

  if (!candidateId) throw new NotCreatedError(`Candidate ${req.value.name} not created`, { candidateId });
});

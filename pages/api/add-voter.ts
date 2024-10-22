import { apiHandler } from "@/libraries/ApiHandler";
import { BadRequestError, NotCreatedError } from "@/libraries/Error";
import { Voter } from "@/services/Voter/Voter";

export default apiHandler<Voter, void>(async (req) => {
  if (!req.value) throw new BadRequestError("Value is required", { value: "required" });

  const voterId = await Voter.create(req.value);

  if (!voterId) throw new NotCreatedError(`Voter ${req.value.name} not created`, { voterId });
});

import { VoterRepository } from "../repository";
import { addVoterRequest } from "../requests/addVoterRequest";

import { InternalServerError } from "@/libraries/Error";

export async function addVoterAction(request: addVoterRequest) {
  const voterRepo = new VoterRepository();
  const voterId = await voterRepo.create(request);

  if (!voterId) throw new InternalServerError("Failed to create voter", { voterId });

  return voterId;
}

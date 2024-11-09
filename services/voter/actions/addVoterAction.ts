import { VoterRepository } from "../repository";
import { addVoterRequest } from "../requests/addVoterRequest";

import { InternalServerError } from "@/libraries/Error";

const voterRepo = new VoterRepository();

export async function addVoterAction(request: addVoterRequest) {
  const voterId = await voterRepo.create(request);

  if (!voterId) throw new InternalServerError("Failed to create voter", { voterId });

  return voterId;
}

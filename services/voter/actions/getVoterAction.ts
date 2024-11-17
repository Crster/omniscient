import { VoterRepository } from "../repository";
import { getVoterRequest } from "../requests/getVoterRequest";

import { InternalServerError } from "@/libraries/Error";

export async function getVoterAction(request: getVoterRequest) {
  const voterRepo = new VoterRepository();
  const voter = await voterRepo.getById(request.voterId);

  if (!voter) throw new InternalServerError("Voter not found", { voter });

  return voter;
}

import { VoterRepository } from "../repository";
import { getVoterRequest } from "../requests/getVoterRequest";

import { InternalServerError } from "@/libraries/Error";

const voterRepo = new VoterRepository();

export async function getVoterAction(request: getVoterRequest) {
  const voter = await voterRepo.getById(request.voterId);

  if (!voter) throw new InternalServerError("Voter not found", { voter });

  return voter;
}

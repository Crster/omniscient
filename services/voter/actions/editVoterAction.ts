import { VoterRepository } from "../repository";
import { editVoterRequest } from "../requests/editVoterRequest";

import { InternalServerError } from "@/libraries/Error";

export async function editVoterAction(request: editVoterRequest) {
  const voterRepo = new VoterRepository();
  const success = await voterRepo.update(request.voterId, request.voter);

  if (!success) throw new InternalServerError("Failed to update voter", { success });

  return success;
}

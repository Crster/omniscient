import { VoterRepository } from "../repository";
import { listVoterRequest } from "../requests/listVoterRequest";

export async function listVoterAction(request: listVoterRequest) {
  const voterRepo = new VoterRepository();
  const voters = await voterRepo.getListByName(request.filter);

  return voters;
}

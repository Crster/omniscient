import { VoterRepository } from "../repository";
import { listVoterRequest } from "../requests/listVoterRequest";

const voterRepo = new VoterRepository();

export async function listVoterAction(request: listVoterRequest) {
  const voters = await voterRepo.getList(request.filter);

  return voters;
}

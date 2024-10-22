import { z } from "zod";

import { VoterListSchema } from "./VoterListSchema";
import * as VoterListAction from "./VoterListAction";

export type VoterList = z.output<typeof VoterListSchema>;
export const VoterList = VoterListAction;

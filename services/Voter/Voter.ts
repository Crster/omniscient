import { z } from "zod";

import { VoterEntity } from "./VoterSchema";
import * as VoterAction from "./VoterAction";

export type Voter = z.output<typeof VoterEntity>;
export const Voter = VoterAction;

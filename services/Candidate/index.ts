import { z } from "zod";

import { CandidateEntity } from "./CandidateSchema";
import * as CandidateAction from "./CandidateAction";

export type Candidate = z.output<typeof CandidateEntity>;
export const Candidate = CandidateAction;

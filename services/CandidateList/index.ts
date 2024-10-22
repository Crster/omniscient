import { z } from "zod";

import { CandidateListSchema } from "./CandidateListSchema";
import * as CandidateListAction from "./CandidateListAction";

export type CandidateList = z.output<typeof CandidateListSchema>;
export const CandidateList = CandidateListAction;

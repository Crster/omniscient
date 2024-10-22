import { z } from "zod";

import { TrashEntity } from "./TrashSchema";
import * as TrashAction from "./TrashAction";

export type Trash = z.input<typeof TrashEntity>;
export const Trash = TrashAction;

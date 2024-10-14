import { startCase } from "lodash";

export interface KeyLabel {
  key: string;
  label: string;
}

export function enumToKeyLabel(enumeration: any) {
  const ret: Array<KeyLabel> = [];

  for (const k in enumeration) {
    ret.push({ key: enumeration[k], label: startCase(k) });
  }

  return ret;
}

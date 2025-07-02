import { flatten, unflatten } from "flat";
import { useState } from "react";

export function useFormState<T>(initialState: T) {
  const [state, setState] = useState<Record<string, any>>(flatten(initialState));

  return {
    state: () => unflatten(state) as T,
    get: <T>(field: string): T => state[field] as T,
    set:
      (field: string) =>
      <T>(value: T) => {
        setState((prevState) => ({ ...prevState, [field]: value }));
      },
  };
}

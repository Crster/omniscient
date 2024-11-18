import { ReactNode, useState } from "react";

export interface ValidationState {
  isInvalid: boolean;
  errorMessage: ReactNode;
}

export default function useValidationState(
  path?: string,
): [Record<string, ValidationState>, (validationError?: Record<string, string>) => void] {
  const [error, setError] = useState<Record<string, ValidationState> | undefined>(undefined);

  return [
    error ?? {},
    (validationError?: Record<string, string>) => {
      if (validationError) {
        const newError = new Map<string, ValidationState>();

        for (const err in validationError) {
          if (path && err.startsWith(path)) {
            newError.set(err.substring(path.length - 1), { isInvalid: true, errorMessage: validationError[err] });
          } else {
            newError.set(err, { isInvalid: true, errorMessage: validationError[err] });
          }
        }

        if (newError.size > 0) {
          setError(Object.fromEntries(newError));
        } else {
          setError(undefined);
        }
      } else {
        setError(undefined);
      }
    },
  ];
}

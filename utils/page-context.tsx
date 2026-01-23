import { createContext, ReactNode, useContext, useState } from "react";

export function usePageState<T>(initialValue: T) {
  const state = useState<T>(initialValue);

  return { value: state[0], set: (value: T) => state[1](value) };
}

export function createPageContext<T>(init: () => T) {
  const context = createContext<T | null>(null);

  return {
    Consumer: () => useContext<T>(context as any),
    Provider: (children: (context: T) => ReactNode) => {
      const store = init();

      return <context.Provider value={store}>{children(store)}</context.Provider>;
    },
  };
}

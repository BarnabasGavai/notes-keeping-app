import { createContext, useContext } from "react";

export const LabelContext = createContext({});

export default function useLabel() {
  return useContext(LabelContext);
}

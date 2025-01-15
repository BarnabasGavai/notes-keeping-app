import { createContext, useContext } from "react";

export const NoteContext = createContext({});

export default function useNote() {
  return useContext(NoteContext);
}

import { createContext, useContext } from "react";

export const AuthContext = createContext({
  signin: () => {},
  register: () => {},
});

export const AuthProvider = AuthContext.Provider;

export default function useTheme() {
  return useContext(AuthContext);
}

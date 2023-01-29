import { createContext, useContext } from "react";

export const DEFAULT_PROFILE = {
  bio: null,
  handle: null,
  id: null,
  name: null,
  ownedBy: null,
};

export const AppContext = createContext({
  isLoading: false,
  defaultProfile: DEFAULT_PROFILE,
  setDefaultProfile: () => {},
});

export const useAppContext = () => useContext(AppContext);

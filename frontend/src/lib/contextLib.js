// Context for entire app that all containers will use.
import { useContext, createContext } from "react";

export const AppContext = createContext(null);

export function useAppContext() {
    return useContext(AppContext);
}

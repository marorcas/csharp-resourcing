import React, { createContext, FC, ReactNode, useState } from "react";
import { TempResponse } from "../../services/temp-services";

interface TempsContextType {
    temps: TempResponse[];
    setTemps: React.Dispatch<React.SetStateAction<TempResponse[]>>;
}

export const TempsContext = createContext<TempsContextType | undefined>(undefined);

interface TempsContextProviderProps {
    children: ReactNode;
}

const TempsContextProvider : FC<TempsContextProviderProps> = ({ children }) => {
    const [temps, setTemps] = useState<TempResponse[]>([]);

    return (
        <TempsContext.Provider value={{temps, setTemps}}>
            {children}
        </TempsContext.Provider>
    )
}

export default TempsContextProvider;
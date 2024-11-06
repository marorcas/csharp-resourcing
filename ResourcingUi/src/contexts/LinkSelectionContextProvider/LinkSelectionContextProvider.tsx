import React, { createContext, FC, ReactNode, useState } from "react";

export const LinkSelection = {
    DASHBOARD: 'dashboard',
    JOBS: 'jobs',
    PEOPLE: 'people'
} as const;

type LinkSelectionType = typeof LinkSelection[keyof typeof LinkSelection];

interface LinkSelectionContextType {
    selectedLink: LinkSelectionType;
    setSelectedLink: React.Dispatch<React.SetStateAction<LinkSelectionType>>;
}

export const LinkSelectionContext = createContext<LinkSelectionContextType | undefined>(undefined);

interface LinkSelectionContextProviderProps {
    children: ReactNode;
}

const LinkSelectionContextProvider: FC<LinkSelectionContextProviderProps> = ({ children }) => {
    const [selectedLink, setSelectedLink] = useState<LinkSelectionType>(LinkSelection.DASHBOARD);

    return (
        <LinkSelectionContext.Provider value={{
            selectedLink, 
            setSelectedLink
        }}>
            {children}
        </LinkSelectionContext.Provider>
    )
}

export default LinkSelectionContextProvider;
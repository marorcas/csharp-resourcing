import React, { createContext, FC, ReactNode, useState } from "react";
import { JobResponse } from "../../services/job-services";

interface JobsContextType {
    jobs: JobResponse[];
    setJobs: React.Dispatch<React.SetStateAction<JobResponse[]>>;
}

export const JobsContext = createContext<JobsContextType | undefined>(undefined);

interface JobsContextProviderProps {
    children: ReactNode;
}

const JobsContextProvider : FC<JobsContextProviderProps> = ({ children }) => {
    const [jobs, setJobs] = useState<JobResponse[]>([]);

    return (
        <JobsContext.Provider value={{jobs, setJobs}}>
            {children}
        </JobsContext.Provider>
    )
}

export default JobsContextProvider;
import { JobFormData } from "../components/JobForm/schema";

const apiBaseUrl = "http://localhost:5180/jobs";

export interface JobResponse {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
}

export const createJob = async (data: JobFormData) => {
    const response = await fetch(apiBaseUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response) {
        throw new Error('Failed to post');
    }

    return await response.json();
}

export const getAllJobs = async () => {
    const response = await fetch(apiBaseUrl);
    if (!response.ok) {
        throw new Error("Failed to fetch");
    }

    const data = await response.json();

    if (data === null) {
        return [];
    }

    return data as JobResponse[];
}

export const deleteJobById = async (id: number) => {
    const response = await fetch(`${apiBaseUrl}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete');
    }
    
    return true;
}
const apiBaseUrl = "http://localhost:5180/jobs";

export interface JobResponse {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
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
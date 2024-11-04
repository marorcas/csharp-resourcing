const apiBaseUrl = "http://localhost:5180/temps";

export interface TempResponse {
    id: number;
    firstName: string;
    lastName: string;
}

export const getAllTemps = async () => {
    const response = await fetch(apiBaseUrl);
    if (!response.ok) {
        throw new Error("Failed to fetch");
    }

    const data = await response.json();

    if (data === null) {
        return [];
    }

    return data as TempResponse[];
}
import { TempFormData } from "../components/TempForm/schema";

const apiBaseUrl = "http://localhost:5180/temps";

export interface TempResponse {
    id: number;
    firstName: string;
    lastName: string;
}

export const createTemp = async (data: TempFormData) => {
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

export const updateTempById = async (id: number, data: TempFormData) => {
    const response = await fetch(`${apiBaseUrl}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
  
    if (!response.ok) {
        throw new Error('Something went wrong');
    }

    return await response.json();
}

export const deleteTempById = async (id: number) => {
    const response = await fetch(`${apiBaseUrl}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete');
    }
    
    return true;
}
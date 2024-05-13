// apiHeaders.ts
import { UserData } from "../../type";

export const generateApiHeaders = (userData: UserData | null): Record<string, string> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    if (userData && userData.data && userData.data.accessToken) {
        headers['Authorization'] = `Bearer ${userData.data.accessToken}`;
    }

    if (userData && userData.data && userData.apiKey && userData.apiKey.key) {
        headers['X-Noroff-API-Key'] = userData.apiKey.key;
    } else {
        const apiKeyDataString = localStorage.getItem('apiKeyData') || sessionStorage.getItem('apiKeyData');
        if (apiKeyDataString) {
            try {
                const apiKeyData = JSON.parse(apiKeyDataString);
                headers['X-Noroff-API-Key'] = apiKeyData.key;
            } catch (error) {
                console.error("Error parsing apiKeyData:", error);
            }
        }
    }

    return headers;
};

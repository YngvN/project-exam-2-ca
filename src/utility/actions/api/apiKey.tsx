import { baseUrl } from './api.url';
import { UserData } from '../../type';
import { fetchWithToken, FetchOptions } from './api.fetch';

const getAccessTokenFromUserData = (userData: UserData | null): string | null => {
    if (userData && userData.data && userData.data.accessToken) {
        return userData.data.accessToken;
    }
    return null;
};

export const createApiKey = async (userData: UserData | null): Promise<string | null> => {
    const accessToken = getAccessTokenFromUserData(userData);
    if (!accessToken) {
        console.error('Access token not found in userData');
        return null;
    }

    const url = `${baseUrl}auth/create-api-key`;
    console.log('Creating API Key with access token:', accessToken);

    try {
        const options: FetchOptions = {
            method: 'POST',
            headers: {
            }
        };

        const result = await fetchWithToken(url, accessToken, options);
        const apiKey = result.data as UserData['apiKey'];
        console.log('API Key created successfully:', apiKey);

        if (userData) {
            userData.apiKey = apiKey;
            console.log('UserData after API Key assignment:', userData);
        }

        return apiKey.key;
    } catch (error: any) {
        console.error('API Key creation error:', error);
        alert('API Key creation failed: ' + (error.message || 'Unknown error'));
        return null;
    }
};

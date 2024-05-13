export interface FetchOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: BodyInit | null;
}

export const fetchWithToken = async (url: string, accessToken: string, options: FetchOptions) => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Request failed');
        }

        return await response.json();
    } catch (error: any) {
        console.error('Request error:', error);
        throw error;
    }
};

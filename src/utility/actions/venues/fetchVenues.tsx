import { baseUrl } from "../api/api.url";

/**
 * Fetch all venues from the server.
 * @returns {Promise<any>} A promise that resolves to the list of venues or rejects with an error.
 */
export async function fetchAllVenues() {
    const url = `${baseUrl}holidaze/venues`;
    console.log('Fetching venues...')

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const venues = responseData.data; // Extract venues array from the response data
        console.log('Fetched venues:', venues);
        return venues;
    } catch (error) {
        console.error("Error fetching venues:", error);
        throw error;
    }
}

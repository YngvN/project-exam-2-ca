import { baseUrl } from "../api/api.url";
import { Venue } from "../../type";

/**
 * Fetch a single venue by its ID from the server.
 * @param {string} id - The ID of the venue to fetch.
 * @returns {Promise<Venue>} A promise that resolves to the venue data or rejects with an error.
 */
export async function fetchVenueById(id: string): Promise<Venue> {
    const url = `${baseUrl}holidaze/venues/${id}`;
    console.log(`Fetching venue with ID: ${id}...`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const venue: Venue = responseData.data; // Extract the venue from the response data
        console.log('Fetched venue:', venue);
        return venue;
    } catch (error) {
        console.error(`Error fetching venue with ID ${id}:`, error);
        throw error;
    }
}

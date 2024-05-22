import { baseUrl } from "../api/api.url";

export const fetchBookingsByVenueId = async (id: string) => {
    const url = `${baseUrl}holidaze/bookings/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
    }
};
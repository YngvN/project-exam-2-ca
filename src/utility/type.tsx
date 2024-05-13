interface Media {
    url: string;
    alt: string;
}

export interface UserData {
    data: {
        name: string;
        email: string;
        bio?: string;
        avatar?: Media;
        banner?: Media;
        venueManager: boolean;
        accessToken: string;
    };
    apiKey: {
        name: string;
        status: string;
        key: string;
    };
}

interface Meta {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
}

interface Location {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    lng: number;
}

interface Person {
    name: string;
    email: string;
    bio: string;
    avatar: Media;
    banner: Media;
}

interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    customer: Person;
}

export interface Venue {
    id: string;
    name: string;
    description: string;
    media: Media[];
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: Meta;
    location: Location;
    owner: Person;
    bookings: Booking[];
}

export interface RootObject {
    data: Venue[];
    meta: {
        isFirstPage: boolean;
        isLastPage: boolean;
        currentPage: number;
        previousPage: number | null;
        nextPage: number | null;
        pageCount: number;
        totalCount: number;
    };
}


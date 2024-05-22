export interface UserData {
    data: {
        name: string;
        email: string;
        bio?: string;
        avatar?: {
            url: string;
            alt: string;
        };
        banner?: {
            url: string;
            alt: string;
        };
        venueManager: boolean;
        accessToken: string;
    };
    apiKey: {
        name: string;
        status: string;
        key: string;
    };
}

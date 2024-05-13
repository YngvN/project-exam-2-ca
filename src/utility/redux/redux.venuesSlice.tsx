// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Venue } from '../../utility/type';

// export interface VenuesState {
//     venues: Venue[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: VenuesState = {
//     venues: [],
//     loading: false,
//     error: null,
// };

// const venuesSlice = createSlice({
//     name: 'venues',
//     initialState,
//     reducers: {
//         fetchVenuesStart(state) {
//             state.loading = true;
//             state.error = null;
//         },
//         fetchVenuesSuccess(state, action: PayloadAction<Venue[]>) {
//             state.venues = action.payload;
//             state.loading = false;
//         },
//         fetchVenuesFailure(state, action: PayloadAction<string>) {
//             state.error = action.payload;
//             state.loading = false;
//         },
//     },
// });

// export const { fetchVenuesStart, fetchVenuesSuccess, fetchVenuesFailure } = venuesSlice.actions;
// export default venuesSlice.reducer;





// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Venue } from '../../utility/type';

// export interface VenuesState {
//     venues: Venue[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: VenuesState = {
//     venues: [],
//     loading: false,
//     error: null,
// };

// const venuesSlice = createSlice({
//     name: 'venues',
//     initialState,
//     reducers: {
//         fetchVenuesStart(state) {
//             state.loading = true;
//             state.error = null;
//         },
//         fetchVenuesSuccess(state, action: PayloadAction<{ venues: Venue[] }>) {
//             state.loading = false;
//             state.error = null;

//             // Check if action.payload.venues is an array and not empty before updating state
//             if (Array.isArray(action.payload.venues) && action.payload.venues.length > 0) {
//                 state.venues = action.payload.venues;
//             } else {
//                 state.error = "No venues found";
//             }
//         },
//         fetchVenuesFailure(state, action: PayloadAction<string>) {
//             state.error = action.payload;
//             state.loading = false;
//         },
//     },
// });

// export const { fetchVenuesStart, fetchVenuesSuccess, fetchVenuesFailure } = venuesSlice.actions;
// export default venuesSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Venue } from '../../utility/type';

export interface VenuesState {
    venues: Venue[];
    loading: boolean;
    error: string | null;
}

const initialState: VenuesState = {
    venues: [],
    loading: false,
    error: null,
};

const venuesSlice = createSlice({
    name: 'venues',
    initialState,
    reducers: {
        fetchVenuesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchVenuesSuccess(state, action: PayloadAction<{ venues: Venue[] }>) {
            console.log('Payload:', action.payload); // Log the payload to inspect its structure
            state.loading = false;
            state.error = null;
            if (Array.isArray(action.payload.venues) && action.payload.venues.length > 0) {
                state.venues = action.payload.venues;
            } else {
                state.error = "Invalid response format: venues array is empty";
            }
        },



        // fetchVenuesSuccess(state, action: PayloadAction<{ venues: Venue[] }>) {
        //     console.log('Payload:', action.payload);
        //     state.venues = action.payload.venues; // Update venues from the payload object
        //     state.loading = false;
        //     state.error = null;
        // },

        fetchVenuesFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchVenuesStart, fetchVenuesSuccess, fetchVenuesFailure } = venuesSlice.actions;
export default venuesSlice.reducer;

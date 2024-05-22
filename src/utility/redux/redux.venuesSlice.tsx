

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
//             console.log('Payload:', action.payload);
//             state.loading = false;
//             state.error = null;
//             if (Array.isArray(action.payload) && action.payload.length > 0) {
//                 state.venues = action.payload;
//             } else {
//                 state.error = "Invalid response format: venues array is empty";
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
        fetchVenuesSuccess(state, action: PayloadAction<Venue[]>) {
            console.log('Payload:', action.payload);
            state.loading = false;
            state.error = null;
            state.venues = action.payload;
        },
        fetchVenuesFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchVenuesStart, fetchVenuesSuccess, fetchVenuesFailure } = venuesSlice.actions;
export default venuesSlice.reducer;
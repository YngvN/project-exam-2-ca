import { configureStore } from '@reduxjs/toolkit';
import venuesReducer from './redux.venuesSlice';

export const store = configureStore({
    reducer: {
        venues: venuesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

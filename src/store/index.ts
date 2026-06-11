import { configureStore } from "@reduxjs/toolkit";
import petReducer from './slices/petSlice'
import roomReducer from './slices/roomSlice'
import transitionReducer from './slices/transitionSlice'

export const store = configureStore({
    reducer:{
        pet: petReducer,
        room: roomReducer,
        transition: transitionReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// External imports
import { configureStore } from '@reduxjs/toolkit'

// Internal imports
import albumReducer from "../features/albums/albumSlice"
import trackReducer from "../features/tracks/trackSlice"

const store = configureStore({
    reducer: {
        album: albumReducer,
        track: trackReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store


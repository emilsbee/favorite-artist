// External imports
import { configureStore } from '@reduxjs/toolkit'

// Internal imports
import albumReducer from "../features/albums/albumSlice"

const store = configureStore({
    reducer: {
        album: albumReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store


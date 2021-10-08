// External imports
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export type Track = {
    duration: number
    url: string
    name: string
    "@atr": {
        rank: number
    }
}
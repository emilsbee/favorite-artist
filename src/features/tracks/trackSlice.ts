// External imports
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

// Internal imports
import {Album} from "../albums/albumSlice";

export type Track = {
    duration: number
    url: string
    name: string
    "@atr": {
        rank: number
    }
}

type DetailedAlbum = Album & {
    tracks: { track: Track[] }
    wiki: {
        published: string
        summary: string
        content: string
    }
}

type TrackState = {
    album: DetailedAlbum
    status: "idle" | "loading" | "succeeded" | "failed",
    error: string | undefined
}

const initialState: TrackState = {
    album: {
        tracks: {track: []},
        wiki: {
            published: "",
            summary: "",
            content: ""
        },
        artist: {
            mbid: "",
            name: "",
            url: ""
        },
        image: [],
        name: "",
        playcount: 0,
        url: "",
        mbid: "",
        date: "",
        popularity: 0
    },
    status: "idle",
    error: undefined
}

export const fetchTracksForAlbum = createAsyncThunk("tracks/fetchTracks", async (albumName: string): Promise<DetailedAlbum> => {
    const tracksRes = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.REACT_APP_API_KEY}&artist=${process.env.REACT_APP_ARTIST_NAME}&album=${albumName}&format=json`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'User-Agent': 'bernhards@emils.xyz'
        }
    })

    const {album} = await tracksRes.json() as {album: DetailedAlbum}

    return album
})

const trackSlice = createSlice({
    name: "tracks",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchTracksForAlbum.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchTracksForAlbum.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.album = action.payload
            })
            .addCase(fetchTracksForAlbum.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }
})

export default trackSlice.reducer
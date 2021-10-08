// External imports
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export type Album = {
    artist: {
        mbid: string
        name: string
        url: string
    }
    image: {
        "#text": string
        size: string
    }[]
    name: string
    playcount: number
    url: string
    mbid: string
    date: string
    popularity: number
}

type AlbumState = {
    albums: Album[]
    status: "idle" | "loading" | "succeeded" | "failed",
    error: string | undefined
}

const initialState: AlbumState = {
    albums: [],
    status: "idle",
    error: undefined
}

export const fetchAlbums = createAsyncThunk("albums/fetchAlbums", async () => {
    const albumsRes = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${process.env.REACT_APP_ARTIST_NAME}&api_key=${process.env.REACT_APP_API_KEY}&format=json&limit=50`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'User-Agent': 'bernhards@emils.xyz'
        }
    })

    let albums = await albumsRes.json() as {topalbums:{album: Album[]}}

    // Filters albums with names that are null as well as names that are literally (null) and albums without any mbid.
    // mbid is necessary to fetch release date from musicbrainz.
    albums.topalbums.album = albums.topalbums.album.filter((album:Album) => album.name != null && album.name !== "(null)" && album.mbid)

    for (let i = 0; i < albums.topalbums.album.length; i++) {
        let albumInfoRes = await fetch(`https://musicbrainz.org/ws/2/release/${albums.topalbums.album[i].mbid}?fmt=json`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'User-Agent': 'bernhards@emils.xyz'
            }
        })
        let albumInfo = await albumInfoRes.json() as {date: string}

        // since not all albums have a release date, those without are removed
        if (albumInfo.date) {
            albums.topalbums.album[i].date = albumInfo.date.substring(0, 4)
            albums.topalbums.album[i].popularity = i
        } else {
            albums.topalbums.album.splice(i, 1)
        }
    }

    return albums.topalbums.album
})

const albumSlice = createSlice({
    name: "album",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchAlbums.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchAlbums.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.albums.push(...action.payload)
            })
            .addCase(fetchAlbums.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }
})

export default albumSlice.reducer
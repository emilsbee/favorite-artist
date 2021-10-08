// External imports
import React, {ReactElement} from "react"
import {useDispatch, useSelector} from "react-redux";

// Internal imports
import {RootState} from "../../app/store"
import {fetchAlbums} from "./albumSlice";
import Spinner from "../../components/Spinner";
import styled from "styled-components";
import AlbumCard from "./AlbumCard";

const Wrapper = styled.section`
  padding: 30px 120px 30px 120px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`

const AlbumList = () => {
    const dispatch = useDispatch()

    // Store state
    const albums = useSelector((state:RootState) => state.album.albums)
    const albumsStatus = useSelector((state:RootState) => state.album.status)
    const error = useSelector((state:RootState) => state.album.error)

    React.useEffect(() => {
        if (albumsStatus === "idle") {
            dispatch(fetchAlbums())
        }
    }, [albumsStatus, dispatch])


    let content: ReactElement | ReactElement[]

    if (albumsStatus === "loading") {
        content = <Spinner/>
    } else if (albumsStatus === "succeeded") {
        content = albums.map(album => (
                <AlbumCard album={album} key={album.mbid}/>
            )
        )
    } else if (albumsStatus === "failed") {
        content = <div>{error}</div>
    } else {
        content = <div></div>
    }

    return (
        <Wrapper>
            {content}
        </Wrapper>
    )
}

export default AlbumList
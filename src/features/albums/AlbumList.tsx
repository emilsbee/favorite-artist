// External imports
import React, {ChangeEvent, ReactElement} from "react"
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";

// Internal imports
import {RootState} from "../../app/store"
import {Album, fetchAlbums} from "./albumSlice";
import Spinner from "../../components/Spinner";
import AlbumCard from "./AlbumCard";
import {comparePopularity, compareName, compareYear} from "./helpers";

const Wrapper = styled.section`
  padding: 30px 120px 30px 120px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0 0 50px;
`

const Select = styled.select`
  width: fit-content;
  
`

const AlbumList = () => {
    const dispatch = useDispatch()

    // Store state
    const albums = useSelector((state:RootState) => state.album.albums)
    const albumsStatus = useSelector((state:RootState) => state.album.status)
    const error = useSelector((state:RootState) => state.album.error)

    // Local state
    const [sortBy, setSortBy] = React.useState<string>("popularity")

    React.useEffect(() => {
        if (albumsStatus === "idle") {
            dispatch(fetchAlbums())
        }
    }, [albumsStatus, dispatch])


    const handleOnChange= (e:ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)


    let content: ReactElement | ReactElement[]

    if (albumsStatus === "loading") {
        content = <Spinner/>
    } else if (albumsStatus === "succeeded") {
        let orderedAlbums: Album[] = []

        if (sortBy === "popularity") {
            orderedAlbums = albums.slice().sort(comparePopularity)
        } else if (sortBy === "name") {
            orderedAlbums = albums.slice().sort(compareName)
        } else if (sortBy === "year") {
            orderedAlbums = albums.slice().sort(compareYear)
        }

        content = orderedAlbums.map(album => (
                <AlbumCard album={album} key={album.mbid}/>
        ))
    } else if (albumsStatus === "failed") {
        content = <div>{error}</div>
    } else {
        content = <div></div>
    }

    return (
        <>
            <SelectWrapper>
                <label htmlFor={"sort"}>Sort by</label>
                <Select name={"sort"} value={sortBy} onChange={handleOnChange}>
                    <option value={"popularity"}>
                        Popularity
                    </option>
                    <option value={"name"}>
                        Name
                    </option>
                    <option value={"year"}>
                        Year
                    </option>
                </Select>
            </SelectWrapper>

            <Wrapper>
                {content}
            </Wrapper>
        </>
    )
}

export default AlbumList
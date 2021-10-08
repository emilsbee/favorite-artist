// External imports
import React, {ReactElement} from "react"
import {useDispatch, useSelector} from "react-redux";
import { RouteComponentProps } from 'react-router';

// Internal imports
import {fetchTracksForAlbum, Track} from "./trackSlice";
import {AppDispatch, RootState} from "../../app/store";
import Spinner from "../../components/Spinner";
import TrackItem from "./TrackItem";
import styled from "styled-components";

const TrackListTitle = styled.h1`
  text-align: center;
  
`

const TrackListWrapper = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

interface MatchParams {
    albumName: string
}

interface TrackListProps extends RouteComponentProps<MatchParams> {}

const TrackList = ({match}: TrackListProps) => {
    const {albumName} = match.params

    const dispatch = useDispatch<AppDispatch>()

    // Store state
    const detailedAlbum = useSelector((state:RootState) => state.track.album)
    const detailedAlbumStatus = useSelector((state:RootState) => state.track.status)
    const error = useSelector((state:RootState) => state.track.error)

    React.useEffect(() => {
        dispatch(fetchTracksForAlbum(albumName))
    }, [])

    let content: ReactElement | ReactElement[]

    if (detailedAlbumStatus === "loading") {
        content = <Spinner/>
    } else if (detailedAlbumStatus === "succeeded") {

        if (!detailedAlbum.tracks) {
            content = <div>This is a single.</div>
        } else if (detailedAlbum.tracks.track.constructor === Array) {
            content = detailedAlbum.tracks.track.map(track => (
                <TrackItem track={track} key={track.name}/>
            ))
        } else if (detailedAlbum.tracks.track) {
            let track = detailedAlbum.tracks.track as unknown as Track
            content = <TrackItem track={track}/>
        } else {
            content = <div></div>
        }
    } else if (detailedAlbumStatus === "failed") {
        content = <div>{error}</div>
    } else {
        content = <div></div>
    }

    return (
        <>
            <TrackListTitle>
                {detailedAlbum.name}
            </TrackListTitle>

            <TrackListWrapper>
                {content}
            </TrackListWrapper>
        </>
    )
}

export default TrackList
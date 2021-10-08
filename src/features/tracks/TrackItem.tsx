// External imports
import React from "react"

// Internal imports
import {Track} from "./trackSlice";
import styled from "styled-components";

const TrackCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

  border-radius: 5px;
  margin: 1rem;
  width: 200px;
  padding: 10px;
  
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`
const TrackCardTitle = styled.h2`
  font-size: 1rem;
  text-align: center;
`

const TrackCardDetails = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-top: 5px;
`

const TrackCardButtons = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`

const TrackCardButton = styled.button`
  background-color: #966fd6;
  border: none;
  outline: none;
  border-radius: 3px;
  padding: 5px;
  color: white;
  font-size: 0.9rem;
  &:hover {
    cursor: pointer;
  }
`

type TrackItemProps = {
    track: Track
}

const TrackItem = ({track}: TrackItemProps) => {

    return (
        <TrackCard>
            <TrackCardTitle>
                {track.name}
            </TrackCardTitle>

            <TrackCardDetails>
                {(track.duration/60).toPrecision(2)}min
            </TrackCardDetails>

            <TrackCardButtons>
                <a target={"_blank"} href={track.url}><TrackCardButton>Listen</TrackCardButton></a>
            </TrackCardButtons>
        </TrackCard>
    )
}

export default TrackItem
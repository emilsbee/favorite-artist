// External imports
import React from "react"
import styled from "styled-components";
import {Link} from "react-router-dom"

// Internal imports
import {Album} from "./albumSlice";
import defaultImage from "./media/default-album-image.png"

const Card = styled.div`
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
const CardTitle = styled.h2`
  font-size: 1rem;
  text-align: center;
`

const CardDate = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-top: 5px;
`

const CardButtons = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`

const CardButton = styled.button`
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

type AlbumCardProps = {
    album: Album
}

const AlbumCard = ({album}:AlbumCardProps) => {

    /**
     * Finds the extralarge album image or returns default image.
     */
    const findAlbumImage = ():string => {
        let image = album.image.find(image => image["#text"] && image.size === "extralarge")

        return image ? image["#text"] : defaultImage
    }

    return (
        <Card>
            <img src={findAlbumImage()} height={200} width={200}/>
            <CardTitle>
                {album.name}
            </CardTitle>
            <CardDate>
                {album.date}
            </CardDate>
            <CardButtons>
                <Link to={`/${album.name}/tracks`}><CardButton>View</CardButton></Link>
                <a target={"_blank"} href={album.url}><CardButton>Listen</CardButton></a>
            </CardButtons>
        </Card>
    )
}

export default AlbumCard
// External imports
import React from 'react'
import {createBrowserHistory} from 'history'
import {Router, Route, Switch} from 'react-router-dom'

// Internal imports
import AlbumList from "../features/albums/AlbumList";
import NavBar from "../app/NavBar"
import TrackList from "../features/tracks/TrackList";

const history = createBrowserHistory()

const AppRouter = () => {

    return (
        <Router history={history}>
            <NavBar/>
            <Switch>
                <Route component={AlbumList} path={"/"} exact={true}/>
                <Route component={TrackList} path={"/:albumName/tracks"}/>
            </Switch>
        </Router>
    )
}

export default AppRouter
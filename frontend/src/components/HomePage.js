import { BrowserRouter as Router, Switch, Link, Route, Redirect } from "react-router-dom";
import CreateRoomPage from './CreateRoomPage.js';
import RoomJoinPage from './RoomJoin.js';
import React from 'react';

function HomePage() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact>
                    <p>Home Page</p>
                </Route>
                <Route path='/join' component={RoomJoinPage} />
                <Route path='/create' component={CreateRoomPage} />
            </Switch>
        </Router>
    )
}

export default HomePage;
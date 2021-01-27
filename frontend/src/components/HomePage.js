import { BrowserRouter as Router, Switch, Link, Route, Redirect } from "react-router-dom";
import CreateRoomPage from './CreateRoomPage.js';
import RoomJoinPage from './RoomJoin.js';
import React from 'react';
import Room from './Room.js';
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";

function HomePage() {

    const renderHomePage = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>
                            Join a Room
                        </Button>
                        <Button color="secondary" to="/create" component={Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        )
    }

    return (
        <Router>
            <Switch>
                <Route path='/' exact>
                    {renderHomePage()} 
                </Route>
                <Route path='/join' component={RoomJoinPage} />
                <Route path='/create' component={CreateRoomPage} />
                <Route path='/room/:roomCode' component={Room} />
            </Switch>
        </Router>
    )
}

export default HomePage;
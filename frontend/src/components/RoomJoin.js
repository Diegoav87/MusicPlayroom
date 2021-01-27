import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const RoomJoinPage = (props) => {
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState('');

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const handleTextFieldChange = (e) => {
        setRoomCode(e.target.value);
    }

    const roomButtonPress = () => {
        const csrftoken = getCookie('csrftoken');
        const requestOption = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({code: roomCode})
        }

        fetch('api/join-room', requestOption)
        .then(response => {
            if (response.ok) {
                props.history.push(`/room/${roomCode}`)
            } else {
                setError("Room not found");
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
              Join a Room
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <TextField
              error={error}
              label="Code"
              placeholder="Enter a Room Code"
              value={roomCode}
              helperText={error}
              variant="outlined"
              onChange={handleTextFieldChange}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="primary"
              onClick={roomButtonPress}
            >
              Enter Room
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Button variant="contained" color="secondary" to="/" component={Link}>
              Back
            </Button>
          </Grid>
        </Grid>
      );
}

export default RoomJoinPage;
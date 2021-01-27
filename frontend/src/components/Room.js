import React, { useState, useEffect } from 'react';

const Room = (props) => {
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);

    const roomCode = props.match.params.roomCode;

    const getRoomDetails = () => {
        fetch(`/api/get-room?code=${roomCode}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setVotesToSkip(data['votes_to_skip']);
            setGuestCanPause(data['guest_can_pause'])
            setIsHost(data['is_host']);
        })
    }

    getRoomDetails();

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest can pause: {guestCanPause.toString()}</p>
            <p>Is host: {isHost.toString()}</p>
        </div>
    )
}

export default Room;
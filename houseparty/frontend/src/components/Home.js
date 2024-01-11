import React, {Component, useEffect, useState} from "react";
import {Grid, Typography, Button, ButtonGroup} from "@material-ui/core";
import {Link, Navigate} from "react-router-dom";


export default function Home() {

       const [roomCode, setRoomCode] = useState(null);

        useEffect(()=>{

            fetch('/api/user-in-room')
            .then((response) => response.json())
            .then((data) => {
                setRoomCode(data.code);
                
            });
            console.log(roomCode);
        }) 

        



    

        return (

            
            
            roomCode ? (<Navigate to = {'/room/' + roomCode.toString()}/>):
            
            <div>
           
            <Grid container spacing = {3} align = "center">
                <Grid item xs = {12} align ="center">
                    <Typography variant ="h3" compact = "h3">
                        HouseParty
                    </Typography>
                </Grid>

                <Grid item xs = {12} align ="center">
                     <ButtonGroup disableElevation variant ="contained" color = "primary">

                    
                        <Button color = "primary" to = "/join" component = {Link}>
                            Join a room
                        </Button> 
                         <Button color = "secondary" to = "/create" component = {Link}>
                            Create a room
                        </Button> 
                    </ButtonGroup> 
                </Grid>


            </Grid>
        
                 
            </div>
                ); 
    
}
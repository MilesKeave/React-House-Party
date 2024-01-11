import React, {Component} from "react";
import {Grid, Typography, TextField, Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function RoomJoinPage (){
    const [roomCode, setRoomCode] = useState("")
    const [error, setError] = useState("")
    const history = useNavigate();

    const handleTextFieldChange = (e) =>{
       setRoomCode(e.target.value)
    }
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type":  "application/json"},
        body: JSON.stringify({
            code: roomCode
        })
    };
    const roomButtonPressed = () => {

        fetch('/api/join-room', requestOptions).then((response)=> 
            {
                if (response.ok){
                    console.log(requestOptions);
                    history('/room/' + roomCode); }
                else{
                    setError("room not found.")
                }
            }).catch((error)=>{console.log(error);
            });


    }
    


   /*  constructor(props){
        super(props);
        this.state = {

            roomCode :"",
            error: ""
        }

        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.roomButtonPressed = this.roomButtonPressed.bind(this);
    } */

    

    

    return (
        
        <Grid container spacing = {1} align="center">
            <Grid item xs={12} align="center">
                <Typography ariant = "h4" omponent="h4">
                    Join a room 1
                </Typography>

            </Grid>
            <Grid item xs={12} align="center">
                <TextField 
                error= "error"
                label = "code"
                placeholder = "Enter a room code"
                //value = {this.state.roomCode}
                helperText = {error}
                onChange = {handleTextFieldChange}
                variant = "outlined">

                </TextField>

            </Grid>
            <Grid item xs={12} align="center">
            <Button variant = "contained"
                color = "secondary"
                onClick = {roomButtonPressed}
                component = {Link}>
                    Enter Room
                </Button>

            </Grid>
            <Grid item xs={12} align="center">
                <Button variant = "contained"
                color = "primary"
                to = "/"
                component = {Link}>Back
                </Button>

            </Grid>
     </Grid>)
    

   
}
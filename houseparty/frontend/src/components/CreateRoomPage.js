import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import  TextField  from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import { Link } from "react-router-dom";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useNavigate } from "react-router";
import { useState } from "react";


export default function CreateRoomPage(){
    const defaultVotes = 2;
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
    const history = useNavigate();

    

    const handleVotesChange = (e) =>{
        setVotesToSkip(e.target.value);
    }

    const handleGuestCanPauseChange = (e) =>{
        setGuestCanPause( e.target.value === 'true'? true: false);
    }
    //const history = useNavigate();

    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json", "Accept": "application/json",},
        body: JSON.stringify({
            votes_to_skip: votesToSkip,
            guest_can_pause: guestCanPause
        }),
    };
    

    const handleRoomButtonPressed = () =>{
        fetch("/api/create-room", requestOptions).then((response) => 
        response.json()).then((data) => history("/room/" + data.code));

    }

    return(

         <Grid container spacing = {1} >
            <Grid item xs = {12} align = "center">
                <Typography component = "h4" variant = "h4">
                    Create A Room
                </Typography>
            </Grid>
            <Grid item xs = {12} align = "center">
                <FormControl component = "fieldset">
                   <FormHelperText>
                    <div align = "center">
                        Guest Controll of Playback state
                    </div>
                   </FormHelperText>
                   <RadioGroup row defaultValue="true" onChange={handleGuestCanPauseChange}>
                    <FormControlLabel value = "true" 
                                    control = {<Radio color = "primary"></Radio>} 
                                    label = "Play/Pause" 
                                    labelPlacement = "bottom">

                    </FormControlLabel>
                    <FormControlLabel value = "false"
                                    control = {<Radio color = "secondary"></Radio>} 
                                    label = "No Control" 
                                    labelPlacement = "bottom">

                    </FormControlLabel>

                   </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs = {12} align = "center">
                <FormControl>
                    <TextField required = {true}
                                type = "number"
                                defaultValue =  {defaultVotes}
                                onChange = { handleVotesChange}
                                inputProps = {{
                                    min: 1,
                                    style: {textAlign:"center"}
                                }}
                     ></TextField>
                     <FormHelperText>
                        <div align = "center">
                            Votes Required to Skip Song
                        </div>


                     </FormHelperText>



                </FormControl>
            </Grid>
            <Grid item xs = {12} align ="center">
                <Button color ="primary" variant = "contained" onClick = { handleRoomButtonPressed}>
                    Create a Room
                </Button>
            </Grid>
            <Grid item xs = {12} align ="center">
                <Button color ="secondary" variant = "contained" to="/" component = {Link}>
                    Back
                </Button>
            </Grid>

            


        </Grid>
    )
}
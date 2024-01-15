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
import {Collapse} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


function CreateRoomPage(props){
    

     
    //const [createRoomData, setCreateRoomData] = useState(defaultProps);
    
    const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause);
    const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip);
    const [sucessMsg, setSucessMsg] = useState("");
    const [severity, setSeverity] = useState("success");
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
        response.json()).then((data) => 
        history("/room/" + data.code));

    }

    const requestOptions2 = {
        method: "PATCH",
        headers: {"Content-Type": "application/json", "Accept": "application/json",},
        body: JSON.stringify({
            votes_to_skip: votesToSkip,
            guest_can_pause: guestCanPause,
            code: props.roomCode
        }),
    };

    const handleUpdateButtonPressed =()=>{
        //console.log("yoooo");


        fetch("/api/update-room", requestOptions2).then((response) => 
        {if(response.ok){
            setSucessMsg('room updated succesfully');
            setSeverity("success");
        }
        else{
            setSucessMsg( 'error updating');
            setSeverity("error");
        }
    
        props.updateCallBack();
    }
        
    
    );


    }

    const particlesInit = useCallback(async engine => {      
        await loadFull(engine);
      }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);



    const renderCreateButtons =()=>{

        return(
            <Grid container spacing = {1}>

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
        );
    }

    const RenderUpdateButton = ()=>{

        return(
            <Grid item xs = {12} align ="center">
                    <Button color ="primary" variant = "contained" onClick = { handleUpdateButtonPressed}>
                        Update a Room
                    </Button>
                </Grid>
        );
    }

    const title = (props.update? "update Room": "CreateRoom");

    return(

        <>
         <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{ "fullScreen": {"enable": true, "zindex":-1}, "background":{ "image":" linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)" }, "particles":{ "number":{ "value":10, "density":{ "enable":false, "value_area":800 } }, "color":{ "value":"#ffffff" }, "shape": { "type": "square", "stroke":{ "width":0, "color":"#000000" }, "polygon":{ "nb_sides":5 } }, "opacity":{ "value":0.25, "random":true, "anim":{ "enable":false, "speed":1, "opacity_min":0.1, "sync":false } }, "size":{ "value":29, "random":true, "anim":{ "enable":false, "speed":2, "size_min":0.1, "sync":false } }, "line_linked":{ "enable":false, "distance":300, "color":"#ffffff", "opacity":0, "width":0 }, "move":{ "enable":true, "speed":0.5, "direction":"top", "straight":true, "out_mode":"out", "bounce":false, "attract":{ "enable":false, "rotateX":600, "rotateY":1200 } } }, "interactivity":{ "detect_on":"canvas", "events":{ "onhover":{ "enable":false, "mode":"repulse" }, "onclick":{ "enable":false, "mode":"push" }, "resize":true }, "modes":{ "grab":{ "distance":800, "line_linked":{ "opacity":1 } }, "bubble":{ "distance":790, "size":79, "duration":2, "opacity":0.8, "speed":3 }, "repulse":{ "distance":400, "duration":0.4 }, "push":{ "particles_nb":4 }, "remove":{ "particles_nb":2 } } }, "retina_detect":true}}
                        />
       

        <div className="center">
        
         <Grid container spacing = {1} >
            
            
           
           
            <Grid item xs = {12} align = "center">
               <Collapse in={sucessMsg!= ''}>
                {sucessMsg !="" ? <Alert severity ={severity} onClose={()=>{setSucessMsg("")}}>{sucessMsg}</Alert> : null}
               </Collapse>
            </Grid>
            <Grid item xs = {12} align = "center">
                <Typography component = "h4" variant = "h4">
                    {title}
                </Typography>
            </Grid>
            <Grid item xs = {12} align = "center">
                <FormControl component = "fieldset">
                   <FormHelperText>
                    <div align = "center">
                        Guest Controll of Playback state
                    </div>
                   </FormHelperText>
                   <RadioGroup row defaultValue={props.guestCanPause.toString()} onChange={handleGuestCanPauseChange}>
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
                                defaultValue =  {votesToSkip}
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
            {props.update? RenderUpdateButton(): renderCreateButtons()}

           

            


        </Grid>
        </div>
        </>
       
    )
}
CreateRoomPage.defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallBack: ()=>{ console.log("called")},
  };

export default CreateRoomPage
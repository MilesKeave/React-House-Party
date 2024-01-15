import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {Grid, Button, Typography} from "@material-ui/core";
import {Link, useNavigate} from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


export function Room(props) {
  const params = useParams();
  const history = useNavigate();
  const [roomCode, setRoomCode] = useState(params.roomCode);
  const [showSetting, setShowSetting] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [count, setCount] = useState(0);
  const initialState = {
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  }
  const [roomData, setRoomData] = useState(initialState) ;
  const initialSong = {
    title: "",
    artist:"",
    duration:"",
    progress:"",
    is_playing:"",
    is_playing: "",
    votes: "",
    votes_required: "",
    id: ""
  }

  const [song, setSong] = useState(initialSong)

  const requestOptions = {
    method: "POST",
    headers: {"Content-Type":"Japplication/json"},
  };

  function authenticateSpotify(){
    fetch('/spotify/is-authenticated').then((response) => response.json()).then((data)=> {
    setSpotifyAuthenticated(data.status);
    {if(!data.status){
      fetch("/spotify/get-auth-url").then((response)=> response.json()).then((data) => {
          window.location.replace(data.url)

      })
    }}
  }

    );


  }

  function updateShowSettings(){

    if (showSetting){
      setShowSetting(false)
    }
    else{
      setShowSetting(true)
    }
    console.log(showSetting);
  }

  function getCurrentSong(){
    fetch("/spotify/current-song").then((response) => {

      if (!response.ok){
        console.log("not ok song response");
        return {};
      }  
      else{
        return response.json();
      }  
    }).then((data)=> {
    setSong(
      {title: data.title,
    artist: data.artist,
    duration: data.duration,
    progress:data.progress,
    image_url: data.image_url,
    is_playing: data.is_playing,
    votes: data.votes,
    votes_required: data.votes_required,
    id: data.id,

  });
    console.log(data);});
  }

  const settingsButton = ()=>{
  
    return (
      <Grid item xs = {12} align = "center">
        <Button variant = "contained" color = "primary" onClick={updateShowSettings}>
            Settings
        </Button>
      </Grid>
    );
  } 

  function updateRoomData(){
    console.log("update");
    fetch("/api/get-room" + "?code=" + roomCode)
      .then(res => 
        {

        if(!res.ok){
          props.leaveRoomCallback();
          history("/");
          //console.log(roomCode);

        }
        return res.json();}
        )
      .then(data => {
        setRoomData({
          ...roomData, 
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
        {if (roomData.isHost){
          authenticateSpotify();
          getCurrentSong();
        }
        else{
          console.log("roomData.isHost");
          console.log(roomData.isHost);
        }
      }
      })


  }

  const renderSettings = () =>{

    return(
      <Grid container spacing = {1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage update = {true} 
          votesToSkip ={roomData.votesToSkip} 
          guestCanPause ={roomData.guestCanPause} 
          roomCode = {roomCode} 
          updateCallBack = {()=>{updateRoomData()}}
          />

          

        </Grid>
        <Grid item xs={12} align="center">
              <Button variant = "contained"
                color = "primary"
                onClick={updateShowSettings}>
                  close
                </Button>
          
        </Grid>
      </Grid>


    );
  }
  

  const leaveRoomPressed = ()=>{

    fetch("/api/leave-room", requestOptions).then((_response) =>{
      props.leaveRoomCallback();
      console.log(props);
      setRoomCode(null);


      history('/');
    });
    setRoomCode(null);


  }

  useEffect(()=>{
    
    let intervalId = setInterval(()=>{getCurrentSong();
      setCount(count + 1);}
    
    ,1000);
    return(() => {
        setCount(count + 1);
        clearInterval(intervalId)
    });
},[count]); 


  useEffect(() => {
    console.log("yelp");
    fetch("/api/get-room" + "?code=" + roomCode)
      .then(res => 
        {

        if(!res.ok){
          props.leaveRoomCallback();
          history("/");
          //console.log(roomCode);

        }
        return res.json();}
        )
      .then(data => {
        setRoomData({
          ...roomData, 
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
        
        
        if (data.is_host){
          console.log('auth here 1');
          authenticateSpotify();
          getCurrentSong();
        } 
       
      })
  },[roomCode,setRoomData]) //It renders when the object changes .If we use roomData and/or roomCode then it rerenders infinite times


  return (

     <>
       {/*  <Particles
               id="tsparticles"
               
               options={{ "fullScreen": {"enable": true, "zindex":-1}, "background":{ "image":" linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)" }, "particles":{ "number":{ "value":10, "density":{ "enable":false, "value_area":800 } }, "color":{ "value":"#ffffff" }, "shape": { "type": "square", "stroke":{ "width":0, "color":"#000000" }, "polygon":{ "nb_sides":5 } }, "opacity":{ "value":0.25, "random":true, "anim":{ "enable":false, "speed":1, "opacity_min":0.1, "sync":false } }, "size":{ "value":29, "random":true, "anim":{ "enable":false, "speed":2, "size_min":0.1, "sync":false } }, "line_linked":{ "enable":false, "distance":300, "color":"#ffffff", "opacity":0, "width":0 }, "move":{ "enable":true, "speed":0.5, "direction":"top", "straight":true, "out_mode":"out", "bounce":false, "attract":{ "enable":false, "rotateX":600, "rotateY":1200 } } }, "interactivity":{ "detect_on":"canvas", "events":{ "onhover":{ "enable":false, "mode":"repulse" }, "onclick":{ "enable":false, "mode":"push" }, "resize":true }, "modes":{ "grab":{ "distance":800, "line_linked":{ "opacity":1 } }, "bubble":{ "distance":790, "size":79, "duration":2, "opacity":0.8, "speed":3 }, "repulse":{ "distance":400, "duration":0.4 }, "push":{ "particles_nb":4 }, "remove":{ "particles_nb":2 } } }, "retina_detect":true}}
                       /> 
 */}

    

      {showSetting? renderSettings():
     /*  <div className='center'> */

    <Grid container spacing ={1}>
      <Grid item xs = {12} align = "center">
        <Typography variant="h4" component ="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <MusicPlayer song = {song}/>
      {roomData.isHost? 
          settingsButton()
          : null
      }

     
      <Grid item xs = {12} align = "center">
          <Button variant = "contained"
                color = "primary"
                onClick={leaveRoomPressed}>
                  Leave Room
                </Button>

      </Grid>

    </Grid>
   /*  </div> */
}
  
   
    </>
    )
}

export default Room
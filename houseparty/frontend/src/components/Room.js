import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {Grid, Button, Typography} from "@material-ui/core";
import {Link, useNavigate} from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';


export function Room(props) {
  const params = useParams();
  const history = useNavigate();
  const [roomCode, setRoomCode] = useState(params.roomCode);
  const [showSetting, setShowSetting] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const initialState = {
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    //song : { }
  }
  const [roomData, setRoomData] = useState(initialState) ;

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
        return {};

      }  
      else{
        return response.json();
      }  
    }).then((data)=> {
    setRoomData({song: data});
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
          //getCurrentSong();
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
          //getCurrentSong();
        } 
       
      })
  },[roomCode,setRoomData]) //It renders when the object changes .If we use roomData and/or roomCode then it rerenders infinite times


  return (

    <div>

      {showSetting? renderSettings():

    <Grid container spacing ={1}>
      <Grid item xs = {12} align = "center">
        <Typography variant="h4" component ="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      {/* <p>
      {JSON.stringify(roomData.song)}
      </p>
 */}
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
}
  
    </div>
    )
}

export default Room
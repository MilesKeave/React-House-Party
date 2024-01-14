import React, {useState, useEffect} from "react"
import {Grid, Typography, Card, IconButton} from "@material-ui/core";



import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseIcon from "@material-ui/icons/Pause";



export default function MusicPlayer({song}){
    const [songProgress, setSongProgress] = useState(0);

    const containerStyles = {
        height: 20,
        width: '90%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
      }
    
      const fillerStyles = {
        height: '100%',
        width: `${songProgress}%`,
        backgroundColor: "blue",
        borderRadius: 'inherit',
        textAlign: 'right'
      }
    
      const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
      }

    

    useEffect(()=>{
        console.log(songProgress)
        setSongProgress((song.progress / song.duration) *100), [song.progress]
    });

    function pauseSong(){
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            
        }
        fetch("/spotify/pause", requestOptions);
        
    }

    function skipSong(){
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            
        }
        fetch("/spotify/skip", requestOptions);

    }

    function playSong(){
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            
        }
        fetch("/spotify/play", requestOptions);
        
    }


    return(
        <Card>

            <Grid container alignItems="center">

                <Grid item align="center" xs={4}>
                    <img src={song.image_url} height = "100%" width = "100%"/>

                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography component ="h5" variant = "h5">
                        {song.title}
                    </Typography>
                    <Typography color="textSecondary" variant = "subtitle1">
                        {song.artist}
                    </Typography>
                    <div>
                        <IconButton onClick ={()=>{
                            song.is_playing? pauseSong(): playSong() }}>
                            {song.is_playing? <PauseIcon></PauseIcon>: <PlayArrowIcon></PlayArrowIcon>}

                        </IconButton>

                        <IconButton onClick ={()=> skipSong()}>
                            <SkipNextIcon>

                            </SkipNextIcon>
                            {song.votes} {"/ "} 
                            {song.votes_required}
                            
                            
                        </IconButton>
                        
                           
                        
                    </div>
                    
                </Grid>
            </Grid>
            <div style={containerStyles}>
                <div style={fillerStyles}>
                    <span style={labelStyles}></span>
                </div>
            </div>

            <p>
            
            </p>
            
        </Card>


    );


}

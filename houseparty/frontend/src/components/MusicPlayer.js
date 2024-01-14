import React, {useState, useEffect} from "react"
import {Grid, Typography, Card, IconButton, LinearProgress} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseIcon from "@material-ui/icons/Pause";


export default function MusicPlayer({song}){

    const [songProgress, setSongProgress] = useState((song.progress / song.duration));

    useEffect(()=>{
        console.log(songProgress)
        setSongProgress((song.progress / song.duration) *100), [song.progress]
    });


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
                        <IconButton>
                            {song.is_playing? <PauseIcon></PauseIcon>: <PlayArrowIcon></PlayArrowIcon>}

                        </IconButton>
                        <IconButton>
                            <SkipNextIcon>

                            </SkipNextIcon>
                        </IconButton>
                    </div>
                    
                </Grid>
            </Grid>
            <LinearProgress determinate
      variant="outlined" value={songProgress}/>
        </Card>


    );


}

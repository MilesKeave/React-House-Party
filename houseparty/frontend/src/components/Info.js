import React, {useState, useEffect} from "react";
import {Grid, Button, Typography, IconButton} from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {Link} from "react-router-dom";

const pages = {
    JOIN: "pages.join",
    CREATE: "pages.create"

}


export default function Info(){

    const [page, setPage] = useState(pages.JOIN)

    function JoinInfo(){
        return (
            "Join Info: Join a room by entering the room code in join a room page"
        );
    }
    function CreateInfo(){
        return "Create Info: Create a room and edit the settings to allow members to play/pause or vote to skip a song. Make sure you play a song on spotify to start the session."
    }

    return(

        <Grid container spacing ={1}>
            <Grid item xs={12} align = "center">
                <Typography component = "h4" variant = "h4">
                {"What Is HouseParty?"}
               </Typography>
            </Grid>
            <Grid item xs={12} align = "center">
                <Typography variant = "body">
                {page === pages.JOIN ? JoinInfo(): CreateInfo() }
                </Typography>
            </Grid>
            <Grid item xs={12} align = "center">
                <IconButton onClick = {()=> {
                    {page === pages.JOIN ? setPage(pages.CREATE) : setPage(pages.JOIN)

                }}}>
                    {page === pages.JOIN ? <NavigateNextIcon/> : <NavigateBeforeIcon></NavigateBeforeIcon>}
                    
                </IconButton>
            </Grid>
            <Grid item xs={12} align = "center">
                <Button color = "secondary" to= "/" component={Link}>
                    Back
                </Button>
            </Grid>

        </Grid>
    );
}

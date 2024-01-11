import React, {Component} from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Home from "./Home";
import Room from "./Room";
import {Grid, Typography, Button, ButtonGroup} from "@material-ui/core";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Switch,
    Link,
    Direct,
    Navigate
} from "react-router-dom";



export default class Homepage extends Component {
    constructor(props){
        super(props);
        this.state ={
            roomCode: null,
        };
    }

    

    /* } */

   /*  async componentDidMount(){
        fetch('/api/user-in-room')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                roomCode: data.code,
            });
        });

    }

    renderHomePage(){

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


    }

    const clearRoomCode=()=>{

            setRoomCode(null);
        }

    

    
 */

    clearRoomCode(){

            setRoomCode(null);
    }

    render(){

        return (
           
            <Router>

          
                <Routes>
                
                <Route path = "/" element = {<Home/>}/>
                <Route path = "/join" element = {<RoomJoinPage/>}/> 
                <Route path = "/create" element = {<CreateRoomPage update={false}/>}/>
                <Route path = "/room/:roomCode" element = {<Room/>} />
                {/* /render ={(props)=>{ return <Room {...props} leaveRoomCallback = {this.clearRoomCode}/>}} */}
                </Routes>
            
            </Router> );
           
                
           
        
    }
}
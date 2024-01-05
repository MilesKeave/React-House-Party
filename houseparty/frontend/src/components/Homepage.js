import React, {Component} from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Home from "./Home";
import Room from "./Room"

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Switch,
    Link,
    Direct,
    Redirect
} from "react-router-dom";

export default class Homepage extends Component {
    constructor(props){
        super(props);
    }

    render(){

        return (
           
            <Router>

          
                <Routes>
                
                <Route path = "/" element = {<div>

                        <p> this the home </p>
                </div>}/> 
                <Route path = "/join" element = {<RoomJoinPage/>}/> 
                <Route path = "/create" element = {<CreateRoomPage/>}/>
                <Route path = "/room/:roomCode" element = {<Room/>}/>
                </Routes>
            
            </Router> );
           
                
           
        
    }
}
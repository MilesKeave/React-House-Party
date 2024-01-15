import React, {Component} from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Home from "./Home";
import Room from "./Room";
import Info from "./Info";
import {Grid, Typography, Button, ButtonGroup} from "@material-ui/core";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";



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
        this.clearRoomCode = this.clearRoomCode.bind(this);
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


        async componentDidMount() {
            fetch("/api/user-in-room")
              .then((response) => response.json())
              .then((data) => {
                this.setState({
                  roomCode: data.code,
                });
              });
          }
        
          renderHomePage(){
            return (

              <>
              <Particles
                     id="tsparticles"
                     
                     options={{ "fullScreen": {"enable": true, "zindex":-1}, "background":{ "image":" linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)" }, "particles":{ "number":{ "value":10, "density":{ "enable":false, "value_area":800 } }, "color":{ "value":"#ffffff" }, "shape": { "type": "square", "stroke":{ "width":0, "color":"#000000" }, "polygon":{ "nb_sides":5 } }, "opacity":{ "value":0.25, "random":true, "anim":{ "enable":false, "speed":1, "opacity_min":0.1, "sync":false } }, "size":{ "value":29, "random":true, "anim":{ "enable":false, "speed":2, "size_min":0.1, "sync":false } }, "line_linked":{ "enable":false, "distance":300, "color":"#ffffff", "opacity":0, "width":0 }, "move":{ "enable":true, "speed":0.5, "direction":"top", "straight":true, "out_mode":"out", "bounce":false, "attract":{ "enable":false, "rotateX":600, "rotateY":1200 } } }, "interactivity":{ "detect_on":"canvas", "events":{ "onhover":{ "enable":false, "mode":"repulse" }, "onclick":{ "enable":false, "mode":"push" }, "resize":true }, "modes":{ "grab":{ "distance":800, "line_linked":{ "opacity":1 } }, "bubble":{ "distance":790, "size":79, "duration":2, "opacity":0.8, "speed":3 }, "repulse":{ "distance":400, "duration":0.4 }, "push":{ "particles_nb":4 }, "remove":{ "particles_nb":2 } } }, "retina_detect":true}}
                             />
            
     
              <div className=" center">
              <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                  <Typography variant="h3" compact="h3">
                    House Party
                  </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                  <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to="/join" component={Link}>
                      Join a Room
                    </Button>
                    <Button color="grey" to="/info" component={Link}>
                      Info
                    </Button>
                    <Button color="secondary" to="/create" component={Link}>
                      Create a Room
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
              </div>
              </>
             
            );
          }

    clearRoomCode = ()=> {

            this.setState({
                roomCode:null,
            });
    }

    render(){

        return (
           
            <Router>

          
                <Routes>
                
                <Route path = "/" element = {this.state.roomCode ? <Navigate to={`/room/${this.state.roomCode}`} /> :this.renderHomePage()}/>
                <Route path = "/join" element = {<RoomJoinPage/>}/> 
                <Route path = "/create" element = {<CreateRoomPage update={false}/>}/>
                <Route path = "/info" element = {<Info/>}/>
                <Route path = "/room/:roomCode" /* element = {<Room/>} /> */
                element={<Room leaveRoomCallback={this.clearRoomCode}/>} />
                </Routes>
            
            </Router> );
           
                
           
        
    }
}
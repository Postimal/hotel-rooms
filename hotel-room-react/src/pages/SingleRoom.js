import React, { Component } from "react";
import { RoomContext } from '../context';
import defaultBcg from '../images/room-1.jpeg';
import Hero from "../components/Hero";
import Banner from "../components/Banner";

export default class SingleRoom extends Component {
  constructor(props){
    super(props)
    // console.log(this.props)
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    }
  }

  static contextType = RoomContext;
   
  // componentDidMount(){

  // }
  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    console.log(room);

    if (!room) {
      return <div className="error">
        <h3>no such room could be found</h3>
      </div>
    }
    return <div>
            {/* <Hero />
            <Banner /> */}
            hello from single room page {room.name}
          </div>;
  }
}

import React from "react";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import RoomContainer from "../components/RoomContainer";

const Rooms = () => {
  return (
    <React.Fragment>
      <Hero hero="roomsHero">
        <Banner title="our rooms">
          <Link to="/" className="btn-primary">
            back home
          </Link>
        </Banner>
      </Hero>
      <RoomContainer />
    </React.Fragment>
  );
};

export default Rooms;

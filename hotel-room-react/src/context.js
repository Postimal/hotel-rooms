import React, { Component } from "react";
import items from "./data";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };
  // getData

  componentDidMount() {
    // this.getData
    let rooms = this.formatData(items);
    // console.log(rooms);
    let featuredRooms = rooms.filter(room => room.featured);
    let maxPrice = Math.max(...rooms.map(room => room.price));
    let maxSize = Math.max(...rooms.map(room => room.size));
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
    });
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = { ...item.fields, images, id }; // images juz sa w srodku tego obiektu ale nadpisuje je swoimi images stworzonymi wyzej
      return room;
    });
    return tempItems;
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  handleChange = event => {
    const target = event.target;
    const value =
      event.type === "checkbox" //dodalismy warunek dlatego ze jest checkbox. z lewej strony jest rozbite na czesci pierwsze nizej w setState w calosci
        ? target.checked
        : target.value;

    this.setState(
      {
        [event.target.name]:
          target.type === "checkbox" ? event.target.checked : event.target.value
      },
      this.filterRooms
    );
    // wywolujemy filterRooms jako callback funckji setState
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;
    console.log("filterin at the moment");
    // all the rooms
    let tempRooms = [...rooms];
    // transform values
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type); // warunek dany aby moc wyswietlic 'all' bez niego nie mozna było tego uzyskac
    }

    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);

    // filter by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    // filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast);
    }

    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets);
    }

    // setting state
    this.setState({ sortedRooms: tempRooms });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };

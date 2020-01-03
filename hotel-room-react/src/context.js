import React, { Component } from 'react';
import items from './data';

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state ={
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading: true,
    };
    // getData

    componentDidMount() {
        // this.getData
        let rooms = this.formatData(items);
        // console.log(rooms);
        let featuredRooms = rooms.filter(room => room.featured);
        this.setState({rooms, featuredRooms,sortedRooms: rooms, loading: false})
    }

    formatData(items){
        let tempItems = items.map(item =>{
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room ={...item.fields,images,id} // images juz sa w srodku tego obiektu ale nadpisuje je swoimi images stworzonymi wyzej
            return room;
        })
        return tempItems
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room) => room.slug === slug)
        return room
    }
    
    render() {
        return (
           <RoomContext.Provider 
             value={{
                ...this.state,
                getRoom: this.getRoom
            }}>
               {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };

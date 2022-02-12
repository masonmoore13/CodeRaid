import React, {useState} from "react";
import axios from "axios";
import EventsInput from "./eventsInput";

export default class Events extends React.Component {
  
  state = {
    events:[],
  };

  componentDidMount(){
    axios.get('http://127.0.0.1:8000/main/api/events/').then(res => {
      console.log(res);
      this.setState({ events: res.data})
    })
  }

  render(){
    return <><ul>{this.state.events.map(event => <li key={event.id}>Event Name: {event.mitchell_event_name} <br/>Location: {event.location}</li>)}</ul>
    <EventsInput/></>
  }

  // React.useEffect(()=> {
  //   axios.get{}
  // })

    // return (
    //   <div>
    //     <h1>Events</h1>
    //   </div>
    // );
  }

  // export default Events;
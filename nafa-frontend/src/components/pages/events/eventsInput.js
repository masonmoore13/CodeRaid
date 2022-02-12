import React, {useState} from "react";
import axios from "axios";

export default class EventsInput extends React.Component {
  
  state = {
    mitchell_event_name: "",
  };

  handleChange = event => {
    this.setState({ mitchell_event_name: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();

    const eventName ={
      mitchell_event_name: this.state.mitchell_event_name,
    }

    axios.post('http://127.0.0.1:8000/main/api/events/', {eventName})
    .then(res => {
      console.log(res)
      console.log(res.data)
    })
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Event location:
          <input type="text" name="location" onChange={this.handleChange}/>
        </label>
        <button type="submit">add</button>
      </form>
    )
  }

}
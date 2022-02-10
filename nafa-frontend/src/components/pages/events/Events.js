import {useState, useEffect} from "react";
import React, { Component } from 'react';
import axios from "axios";
import List from "../../../List";

class Event extends Component{
  state = {
    events: []
  };

  async componentDidMount() {
    try {
      const res = await fetch('main/api/event');
      const events = await res.json();
      this.setState({
        events
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        {this.state.events.map(item => (
          <div key={item.id}>
            <h2>{item.id}</h2>
            <h1>{item.event_name}</h1>
            <span>{item.description}</span>
          </div>
        ))}
      </div>
    );
  }
}   

export default Event;
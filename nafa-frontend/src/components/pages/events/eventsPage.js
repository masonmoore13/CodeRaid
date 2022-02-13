import React, { useEffect, useState } from "react";
import axios from "axios";
// import EventsInput from "./eventsInput";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Events = () => {

  const [events, updateEvents] = useState()

  const getEvents = async () => {
    const response = await axios.get('http://127.0.0.1:8000/main/api/events/')
    updateEvents(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    // <Router>
    // <Switch>
    <>
      <div>{events.map((event, index) => (
        <div>
          <p>{event.mitchell_event_name}</p>
          <p>{event.location}</p>
          <br />
        </div>
      )
      )
    }
    </div>
    </>
    // </Switch>
    // </Router> 
  )

}

export default Events
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddEvent from "./addEvent";

const Events = () => {

  const [events, updateEvents] = useState([])

  const getEvents = async () => {
    const response = await axios.get('http://127.0.0.1:8000/main/api/event/')
    updateEvents(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <>
      <div>
        {events.map((event, index) => (
          <div>Event Name: {event.event_name} event Location: {event.location}</div>
        )
        )
        }
        <AddEvent/>
      </div>
    </>
  )

}

export default Events
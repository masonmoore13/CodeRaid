import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
        <Link as={Link} to="addevent">Click here to add an event.</Link>
      </div>
    </>
  )

}

export default Events
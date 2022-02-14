import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "./Event.css";
import { Link } from "react-router-dom";
import { getEvents } from "../../../api/apiCalls";

const ShowEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(response =>{
      console.log(response.data);
      setEvents(response.data)
    }).catch((error)=>{
      console.log(error.message);
    })
  }, []);

  return (
      <div className="showEvents">
        {events.map((event, index) => (
          <Card
            className="m-3 rounded shadow-lg"
            border="warning"
            bg="light"
            text="dark"
            style={{ width: "22em" }}
            key={event.id}
          >
            <Card.Img src={event.image} />

            <Card.Body>
              <Card.Title>Event Name: {event.event_name}</Card.Title>
              <Card.Text> Date: {event.date} </Card.Text>
              <Card.Text> Description: {event.description} </Card.Text>
              <Card.Text> Event ID: {event.id} </Card.Text>
              <Card.Text>
                <img src={event.gallery} width="200px" alt="" />
              </Card.Text>
              <Link
                className="btn btn-outline-dark btn-warning mr-2"
                to={`/event/${event.id}/`}
              >
                Event Details
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
  );
};

export default ShowEvents;

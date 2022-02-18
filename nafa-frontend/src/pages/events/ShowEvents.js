import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "./Event.css";
import { Link } from "react-router-dom";
import { getEvents } from "../../../api/apiCalls";

const ShowEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="completedEvents">
      
        <div className="header">
          Events
        </div>
     <Card className="cardBox" border="white" boxShadow="none">
      <div className="showEvents">
        {events.map((event, index) => (
          <Card
            className="m-3 rounded shadow-lg"
            border="dark"
            style={{ width: "22em" }}
            key={event.id}
          >
            <Card.Body>
              <Card.Title>{event.event_name}</Card.Title>
              <Card.Text> {event.time} </Card.Text>
              <Card.Text>  {event.description} </Card.Text>
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
      <hr />
      Completed Events
      
      </Card>
    </div>
  );
};

export default ShowEvents;

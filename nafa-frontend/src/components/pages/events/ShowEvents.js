import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import "./Event.css";
import { Link } from "react-router-dom";

const ShowEvents = () => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const response = await axios.get(`/main/api/event/`);
    setEvents(response.data);
  };

  useEffect(() => {
    getEvents();
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

import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "./Event.css";
import { Link } from "react-router-dom";
import { getEvents } from "../../api/apiCalls";

const ShowEvents = () => {
  const [event, setEvents] = useState([]);

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
    <Card className="container-md mx-auto">
      <div className="header text-center display-3">Events</div> <hr />
      <div className="showEvents d-flex flex-row flex-wrap justify-content-center">
        {event.map((event, index) => (
          <Card
            className="m-4 shadow-lg"
            border="dark"
            style={{ width: "27em" }}
            key={event.id}
          >
            <Card.Body>
              <Card.Title style={{ fontSize: "30px" }}>
                {event.event_name} <hr />
              </Card.Title>
              <Card.Text style={{ fontSize: "20px" }}>{event.date}</Card.Text>
              <Card.Text style={{ fontSize: "20px" }}>{event.time} </Card.Text>
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
      <div className="container-lg text-center">Completed Events</div>
    </Card>
  );
};

export default ShowEvents;

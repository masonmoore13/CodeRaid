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
    <div className="completedEvents">
      <div className="showEventsHeader">Events</div>
      <Card className="showEventsCardbox" border="white" boxShadow="none">
        <div className="showEvents">
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
                <Card.Text style={{ fontSize: "20px" }}>
                  {" "}
                  {event.date}{" "}
                </Card.Text>
                <Card.Text style={{ fontSize: "20px" }}>
                  {" "}
                  {event.time}{" "}
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
        <hr />
        Completed Events
      </Card>
    </div>
  );
};

export default ShowEvents;

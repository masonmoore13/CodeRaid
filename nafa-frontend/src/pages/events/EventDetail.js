import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getEventById, deleteEventById } from "../../api/apiCalls"
import { Card } from "react-bootstrap";
import "./Event.css";

const EventDetail = () => {
  const [event, setEvent] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEventById(id).then((response) => {
      setEvent(response.data);
    });
  }, [id]);

  const deleteEvent = async (id) => {
    deleteEventById(id)
      .then((response) => {
        console.log("delete successful");
      })
      .catch((error) => {
        console.log(error.message);
      });
    navigate.push("/");
  };

  return (
    <div className="eventDetail">
      <Card className="cardBox" border="white" boxShadow="none">
        <img className="banner" src={event.banner_image} alt="..."></img>

        <div className="detailHeader">{event.event_name}</div>

        <hr />
        <div className="full-event-detail">
          <div className="eventDetail">
            <p>Date: {event.date}</p>
            <p>Description: {event.description}</p>
            <p><img src={event.gallery} height="300px" /></p>
          </div>
        </div>

        <Link
          className="btn btn-outline-dark btn-warning mr-2"
          bg="warning"
          to={`/event/${event.id}/update`}
        >
          Update
        </Link>
        <a
          href="/event"
          className="btn btn-outline-dark btn-danger mr-2"
          bg="warning"
          to={``}
          onClick={() => deleteEvent(event.id)}
        >
          Delete
        </a>
      </Card>
    </div>
  );
};

export default EventDetail;

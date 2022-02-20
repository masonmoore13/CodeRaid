import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getEventById, deleteEventById } from "../../../api/apiCalls";
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
      <Card className="eventDetailCardBox" border="white" boxShadow="none">
        <div className="bg"><img className="eventDetailBanner" src={event.banner_image} alt="..."></img></div>

        <div className="detailHeader display-4">{event.event_name}</div>

        <hr />
        <div className="full-event-detail">
          <div className="eventDetail text-start">
            <p> {event.description}</p>
            <p> {event.date}</p>
            <p> {event.time}</p>
            <p> {event.address_line}</p>
            <p> {event.city}</p>
            <p> {event.state}</p>
            <p> {event.contact_name}</p>
            <p> {event.contact_number}</p>
            <p> {event.contact_email}</p>
            <p> {event.zip_code}</p>
            <p><img src={event.gallery} height="300px" /></p>
          </div>
        </div>     
      </Card> 


      <Link
          className="btn btn-outline-dark btn-warning mb-5 m-1"
          bg="warning"
          to={`/event/${event.id}/update`}
        >
          Update
        </Link>
        <a
          href="/event"
          className="btn btn-outline-dark btn-danger mb-5 m-1"
          bg="warning"
          to={``}
          onClick={() => deleteEvent(event.id)}
        >
          Delete
        </a></div>
  );
};

export default EventDetail;

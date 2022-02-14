import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getEventById, deleteEventById } from "../../../api/apiCalls";
import "./Event.css";

const EventDetail = () => {
  const [event, setEvent] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEventById(id).then((response)=>{
      setEvent(response.data)
    })
  }, [id]);


  const deleteEvent = async (id) => {
    deleteEventById(id).then((response)=>{
      console.log("delete successful")
    }).catch((error)=>{
      console.log(error.message)
    })
    navigate.push("/");
  };

  return (
    <div className="eventDetail">
      <h2>Detail of Event </h2>
      <hr/>
      <div className="full-event-detail">
        <div className="eventDetail">
          <p>Event ID: {event.id}</p>
          <p>Event Name: {event.event_name}</p>
          <p>Date: {event.date}</p>
          <p>Description: {event.description}</p>
          <p>Registration fees: {event.registration_fees}</p>
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
    </div>
  );
};

export default EventDetail;

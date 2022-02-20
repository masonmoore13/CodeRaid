import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getEventById, deleteEventById } from "../../../api/apiCalls";
import { Card, CardGroup, Col } from "react-bootstrap";
import Modal from "./Modal"
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
      <div className="bg">
        <img
          className="eventDetailBanner"
          src={event.banner_image}
          alt="..."
        ></img>
      </div>

      <Card className="eventDetailCardBox">
        <div className="eventNameHeader display-3 d-flex justify-content-center">
          {event.event_name}
          <div className="detailButtons ">
            <Link
              className="btn btn-outline-dark btn-warning mb-5 m-1"
              bg="warning"
              to={`/event/${event.id}/update`}
            >
              Update
            </Link>
            <a
              href="/event"
              className="btn btn-outline-white btn-dark mb-5 m-1"
              bg="warning"
              to={``}
              onClick={() => deleteEvent(event.id)}
            >
              Delete
            </a>
          </div>
        </div>

        <CardGroup className="detailsBodyCard ">
          <Col className="m-1 shadow-lg col-md-8 text-start" >
            <Card className="m-4 shadow-lg d-flex " border="" style={{ width: "96%" }}>
              <p> {event.description}</p>
              <p> {event.date}</p>
              <p> {event.time}</p>

              <img src={event.gallery} width="250px" alt="..." />
            </Card>
          </Col>

          <Col className="DetailsRightCol m-2 shadow-lg ">
            <Card className="m-4 shadow-lg text-start" border="" style={{ width: "93%" }}>
            <Card.Title className="text-center">Venue<hr/></Card.Title>
            <p> {event.address_line}</p>
              <p> {event.city}</p>
              <p> {event.state}</p>
              <p> {event.zip_code}</p>
            </Card>
            <Card className="DetailsRightCol m-4 shadow-lg " border="" style={{ width: "93%" }}>
            <Card.Title>Contact Info <hr/></Card.Title>
              <p> {event.contact_name}</p>
              <p> {event.contact_number}</p>
              <p> {event.contact_email}</p>
            </Card>
            <Card className="DetailsRightCol m-4 shadow-lg " border="" style={{ width: "93%" }}>
            <Card.Title>Event Pictures <hr/></Card.Title>
              
            </Card>
          </Col>
        </CardGroup>
      </Card>
    </div>
  );
};

export default EventDetail;

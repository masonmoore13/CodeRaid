import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getEventById, deleteEventById } from "../../../api/apiCalls";
import { Card, CardGroup, Col } from "react-bootstrap";
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

      <Card className="eventDetailCardBox text-start">
        <div className="detailButtons display-4 d-flex justify-content-center">
          <div className="eventNameHeader text-center">{event.event_name}</div>
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
            </a>

        </div>

        <CardGroup className="">
          <Col className="m-1 shadow-lg">
            <Card className="m-4 shadow-lg" border="" style={{ width: "30em" }}>
              <p> {event.description}</p>
              <p> {event.date}</p>
              <p> {event.time}</p>

              <img src={event.gallery} width="250px" alt="..."/>
            </Card>
          </Col>

          <Col className="m-2 shadow-lg">
            <Card className="m-4 shadow-lg" border="" style={{ width: "10em" }}>
              <p> {event.address_line}</p>
              <p> {event.city}</p>
              <p> {event.state}</p>
              <p> {event.zip_code}</p>
            </Card>
            <Card className="m-4 shadow-lg" border="" style={{ width: "10em" }}>
              <p> {event.contact_name}</p>
              <p> {event.contact_number}</p>
              <p> {event.contact_email}</p>
            </Card>
          </Col>
        </CardGroup>
      </Card>
    </div>
  );
};

export default EventDetail;

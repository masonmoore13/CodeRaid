import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getEventById,
  deleteEventById,
  getGalleryByEventId,
} from "../../api/apiCalls";
import { Card, CardGroup, Col, Modal, Button } from "react-bootstrap";
import "./Event.css";
import ModalImage from "react-modal-image";

const EventDetail = () => {
  const [event, setEvent] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);

  //Delete confirmation modal state and close/open functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Get event by ID
  useEffect(() => {
    getEventById(id).then((response) => {
      setEvent(response.data);
    });
  }, [id]);

  //Get Gallery by event id. All images associated with event id {}
  useEffect(() => {
    getGalleryByEventId(id).then((response) => {
      setGallery(response.data);
    });
  }, []);

  //Delete event by id
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
    <div className="text-center ">
      <Card className="event-container container-md mx-auto">
        <img
          className="container banner-image"
          src={event.banner_image}
          alt="..."
        ></img>
        <div className="container d-flex flex-column flex-lg-wrap justify-content-center">
          <div className="eventName display-3">{event.event_name}</div>
          <div className="deleteModal ">
            <Button
              className="btn btn-outline-dark btn-warning m-1"
              href={`/event/${event.id}/update`}
            >
              Update
            </Button>

            <Button variant="dark" onClick={handleShow}>
              Delete
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Are you sure you want to delete this event?
                </Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  href="/event"
                  variant="dark"
                  onClick={() => deleteEvent(event.id)}
                >
                  Confirm Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        <CardGroup className="detailsBodyCard">
          <Col className="shadow-sm col-lg-8  text-start ">
            <Card className="detailsLeftCol mx-auto shadow-sm w-100 " border="">
              <p className="description m-2">{event.description}</p>
              <p className=" m-2"> {event.date}</p>
              <p className=" m-2"> {event.time}</p>
            </Card>
          </Col>

          <Col className="DetailsRightCol m-2 col-lg-3 shadow-sm ">
            <Card className="venueCard m-3 shadow-sm text-start w-100">
              <Card.Title className="text-center">
                Venue
                <hr />
              </Card.Title>
              <h6 className=" mx-1"> {event.address_line}</h6>
              <h6 className=" mx-1"> {event.city}</h6>
              <h6 className=" mx-1"> {event.state}</h6>
              <h6 className=" mx-1"> {event.zip_code}</h6>
              <a
                className="btn btn-outline-dark btn-warning mx-auto 50 mb-2 m-1 "
                href={`http://maps.google.com/?q=${event.address_line} ${event.city} ${event.state} ${event.zip_code}`}
              >
                Get Directions
              </a>
            </Card>
            <Card className="contactDetails m-3 shadow-sm w-100 ">
              <Card.Title>
                Contact Details <hr />
              </Card.Title>
              <h6 className="text-start mx-1">{event.contact_name}</h6>
              <h6 className="text-start mx-1"> {event.contact_email}</h6>
              <h6 className="text-start mx-1"> {event.contact_number}</h6>
            </Card>

            <Card className="row m-2 shadow-sm w-100 ">
              <Card.Title>
                Event Pictures <hr />
              </Card.Title>
              <div className="row d-flex flex-row">
                {" "}
                {gallery.map((gallery, index) => (
                  <div className="col-6 d-flex flex-row" key={gallery.id}>
                    <ModalImage
                      className="d-flex flex-column"
                      showRotate="true"
                      small={gallery.event_image}
                      large={gallery.event_image}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </CardGroup>
      </Card>
    </div>
  );
};

export default EventDetail;

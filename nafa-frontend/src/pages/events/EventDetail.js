import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getEventById,
  deleteEventById,
  getGalleryByEventId,
} from "../../api/apiCalls";
import { Card, CardGroup, Col, Modal, Button, Row } from "react-bootstrap";
import "./Event.css";

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
    <div className="w-100 text-center ">
      <img
        className="banner-image"
        src={event.banner_image}
        alt="..."
      ></img>

      <Card className="event-container container-md mx-auto">
        <Row className="title-row d-flex flex-lg-row flex-column align-items-center justify-content-center">
            <Col className="eventName display-3 col-lg-8 mx-auto">{event.event_name}</Col>
            <Col className="buttonModal col-lg-3 modal-fullscreen-sm-down mx-auto">
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
            </Col>
        </Row>

        <Row className="detailsBodyCard">
          <Col className="DetailsLeftCol shadow-sm col-lg-8 mx-auto text-start ">
            <Card
              className="description-card mx-auto shadow-sm"
              border=""
              style={{ width: "96%", height: "97%" }}
            >
              <p className="description m-2">{event.description}</p>
              <p className=" m-2"> {event.date}</p>
              <p className=" m-2"> {event.time}</p>
            </Card>
          </Col>

          <Col className="DetailsRightCol mx-auto col-lg-3 shadow-sm">
            <Card
              className="venueCard shadow-sm text-start mb-3"
              style={{ width: "93%" }}
            >
              <Card.Title className="text-center">
                Venue
                <hr />
              </Card.Title>
              <h5 className=" mx-1"> {event.address_line}</h5>
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
            <Card
              className="contactDetails shadow-sm mb-3"
              border=""
              style={{ width: "93%" }}
            >
              <Card.Title>
                Contact Details <hr />
              </Card.Title>
              <h5> {event.contact_name}</h5>
              <h6> {event.contact_email}</h6>
              <h6> {event.contact_number}</h6>
            </Card>
            <Card
              className="DetailsRightCol shadow-md mb-3"
              border=""
              style={{ width: "93%" }}
            >
              <Card.Title>
                Event Pictures <hr />
                <div className="showGallery d-flex flex-wrap m-3">
                  {gallery.map((gallery, index) => (
                    <div key={gallery.id}>
                      <img
                        src={gallery.images}
                        alt="event images"
                        style={{ width: "6em" }}
                      />
                    </div>
                  ))}
                </div>
              </Card.Title>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default EventDetail;

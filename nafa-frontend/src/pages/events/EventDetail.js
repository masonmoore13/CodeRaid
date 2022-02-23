import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getEventById, deleteEventById, getGallery, getGalleryById, getGalleryByEventId } from "../../api/apiCalls";
import { Card, CardGroup, Col, Modal, Button } from "react-bootstrap";
import "./Event.css";

const EventDetail = () => {
  const [event, setEvent] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

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
    const [gallery, setGallery] = useState([]);
    useEffect(() => {
    getGalleryById(id).then((response) => {
      setGallery(response.data);
    });
  }, [id]);

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
    <div className="eventDetail">
      <div className="bg">
        <img
          className="eventDetailBanner"
          src={event.banner_image}
          alt="..."
        ></img>
      </div>

      {gallery.event_id}
         <img
                className="eventDetailBanner"
                src={gallery.images}
                alt="..."
              ></img>

              
      <Card className="eventDetailCardBox ">
        <div className=" display-3 d-flex flex-lg-wrap justify-content-center">
          <div className="eventName">{event.event_name}</div>
          <div className="justify-content-center">
            <div className="detailButtons position">
              <div className="deleteModal modal-fullscreen-sm-down">
                <Button
                  className="btn btn-outline-dark btn-warning m-1"
                  bg="warning"
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
              <div class="modal fade" id="exampleModal">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Modal title
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">...</div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" class="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardGroup className="detailsBodyCard ">
          <Col className="m-1 shadow-lg col-md-8 text-start">
            <Card
              className="m-4 shadow-lg d-flex "
              border=""
              style={{ width: "96%" }}
            >
              <p className="description m-2"> {event.description}</p>
              <p className=" m-2"> {event.date}</p>
              <p className=" m-2"> {event.time}</p>
            </Card>
          </Col>

          <Col className="DetailsRightCol m-2 shadow-lg  ">
            <Card
              className="m-4 shadow-lg text-start"
              border=""
              style={{ width: "93%" }}
            >
              <Card.Title className="text-center">
                Venue
                <hr />
              </Card.Title>
              <p className=" mx-1"> {event.address_line}</p>
              <p className=" mx-1"> {event.city}</p>
              <p className=" mx-1"> {event.state}</p>
              <p className=" mx-1"> {event.zip_code}</p>
              <a
                className="btn directionsButton btn-outline-dark btn-warning  w-50 mb-2 m-1"
                bg="warning"
                href={`http://maps.google.com/?q=${event.address_line} ${event.city} ${event.state} ${event.zip_code}`}
              >
                Get Directions
              </a>
            </Card>
            <Card
              className="DetailsRightCol m-4 shadow-lg "
              border=""
              style={{ width: "93%" }}
            >
              <Card.Title>
                Contact Details <hr />
              </Card.Title>
              <p> {event.contact_name}</p>
              <p> {event.contact_number}</p>
              <p> {event.contact_email}</p>
            </Card>
            <Card
              className="DetailsRightCol m-4 shadow-lg "
              border=""
              style={{ width: "93%" }}
            >
              <Card.Title>
                Event Pictures <hr />
              </Card.Title>
            </Card>
          </Col>
        </CardGroup>
      </Card>
    </div>
  );
};

export default EventDetail;

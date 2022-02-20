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
      <Card className="cardBox" border="white" boxShadow="none">
        <div className="bg"><img className="banner" src={event.banner_image} alt="..."></img></div>

        <div className="detailHeader display-4">{event.event_name}</div>

        <hr />
        {/* <div class="flex-container" className="event-detail-container"> */}
        <table className="event-detail-table">
          <tr>
            <td>
                <img src={event.gallery} className="event-detail-image"/>
            </td>

            <td>
              <div className="event-text">
                <p className="event-detail-description"> {event.description}</p>
                <p className="event-detail-date"> {event.date}</p>
                <p className="event-detail-time"> {event.time}</p>
                <p className="event-detail-address"> {event.address_line}</p>
                <p className="event-detail-city"> {event.city}</p>
                <p className="event-detail-state"> {event.state}</p>
                <p className="event-detail-contact-name"> {event.contact_name} {event.contact_number}</p>
                <p className="event-detail-email"> {event.contact_email}</p>
                <p className="event-detail-zip"> {event.zip_code}</p>
              </div>
            </td>
          </tr>
        </table>
        {/* </div> */}
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

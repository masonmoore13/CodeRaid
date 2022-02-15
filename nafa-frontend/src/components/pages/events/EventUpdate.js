import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById, updateEventById } from "../../../api/apiCalls";

const EventUpdate = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [event_name, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [banner_image, setBannerImage] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [registration_fees, setRegistrationFees] = useState("");
  const [rsvpd_members, setRsvpdMembers] = useState("");
  const [galleryChanged, setGalleryChanged] = useState(false);

  useEffect(() => {
    getEventById(id).then((response) => {
      console.log(response.data.gallery);
      setEventName(response.data.event_name);
      setDate(response.data.date);
      setTime(response.data.date);
      setLocation(response.data.location);
      setGallery(response.data.gallery);
      setDescription(response.data.description);
      setRegistrationFees(response.data.registration_fees);
    });
  }, [id]);

  const onGalleryChange = (eve) => {
    eve.preventDefault();
    setGalleryChanged(true);
    setGallery(eve.target.files[0]);
  };

  const updateSingleEvent = async () => {
    let formField = new FormData();

    formField.append("event_name", event_name);
    formField.append("date", date);
    formField.append("time", time);
    formField.append("location", location);
    formField.append("gallery", gallery);
    formField.append("description", description);
    formField.append("registration_fees", registration_fees);

    if (galleryChanged === false) {
      setGallery(null);
    }
    formField.append("gallery", gallery);
    updateEventById(id, formField)
      .then((response) => {
        console.log(response.data);
        //navigate.push("/");
      })
      .catch((error) => {
        console.log("Error occured " + error.message);
      });
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Update Event</h2>

        <div className="form-group">
          Event Name:
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter event name"
            name="event_name"
            value={event_name}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div className="form-group">
          {" "}
          Date
          <input
            type="date"
            className="form-control form-control-lg"
            placeholder="Enter date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          {" "}
          Time
          <input
            type="time"
            id="appt"
            min="09:00"
            max="12:00"
            required
            name="time"
            className="form-control form-control-lg"
            placeholder="Enter time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          Location
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <img src={gallery} height="100" width="200" alt="" srcSet="" />
          <input
            type="file"
            className="form-control"
            onChange={onGalleryChange}
          />
        </div>

        <div className="form-group">
          Description
          <textarea
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          Registration Fees{" "}
          <input
            type="text"
            className="Registration Fees"
            name="registration_fees"
            value={registration_fees}
            onChange={(e) => setRegistrationFees(e.target.value)}
          />
        </div>

        <a
          href="/event"
          size="large"
          onClick={updateSingleEvent}
          className="btn btn-outline-dark btn-warning btn-block"
        >
          Update Event
        </a>
      </div>
    </div>
  );
};

export default EventUpdate;

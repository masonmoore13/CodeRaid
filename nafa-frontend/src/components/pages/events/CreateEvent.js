import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Event.css";

const CreateEvent = () => {
  let navigate = useNavigate();

  const [event_name, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [banner_image, setBannerImage] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [registration_fees, setRegistrationFees] = useState("");
  const [rsvpd_members, setRsvpdMembers] = useState(""); 

  const CreateEventInfo = async () => {
    let formField = new FormData();

    formField.append("event_name", event_name);
    formField.append("date", date);
    formField.append("location", location);
    /* formField.append("banner_image", banner_image); */
    formField.append("gallery", gallery);
    formField.append("description", description);
    /* formField.append("media", media); */
    formField.append("registration_fees", registration_fees);
    /* formField.append("rsvpd_members", rsvpd_members); */

    if (gallery !== null) {
      formField.append("gallery", gallery);
    }

    await axios({
      method: "post",
      url: "/main/api/event/",
      data: formField,
    }).then((response) => {
      console.log(response.data);
      navigate.push("/");
    });
  };

  return (
  
      <div className="w-50 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add An Event</h2>

        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Event Name"
            name="event_name"
            value={event_name}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Date of Event"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Event Images</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) =>
              setGallery(e.target.files[0])
            } /*Set to maximum of 1 */
          />
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Description of Event"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">$</span>
              <span class="input-group-text">0.00</span>
            </div>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Registration Fee"
              name="registration_fees"
              value={registration_fees}
              onChange={(e) => setRegistrationFees(e.target.value)}
            />
          </div>
        </div>

        <a href="/event" className="btn btn-warning" onClick={CreateEventInfo}>
          Add Event
        </a>
      </div>
    
  );
};

export default CreateEvent;

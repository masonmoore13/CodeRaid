import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Event.css";
import { createEvent } from "../../api/apiCalls";

const CreateEvent = () => {
  let navigate = useNavigate();

  const [event_name, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address_line, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [contact_name, setContactName] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [contact_email, setContactEmail] = useState("");
  const [gallery, setGallery] = useState("");
  const [description, setDescription] = useState("");
  const [registration_fees, setRegistrationFees] = useState("");

  const [rsvpd_members, setRsvpdMembers] = useState("");
  const [banner_image, setBannerImage] = useState("");
  const [media, setMedia] = useState("");

  const CreateEventInfo = async () => {
    let formField = new FormData();

    formField.append("event_name", event_name);
    formField.append("date", date);
    formField.append("time", time);
    formField.append("address_line", address_line);
    formField.append("city", city);
    formField.append("state", state);
    formField.append("zip_code", zip_code);
    formField.append("contact_name", contact_name);
    formField.append("contact_number", contact_number);
    formField.append("contact_email", contact_email);
    formField.append("description", description);
    formField.append("registration_fees", registration_fees);

    /* formField.append("rsvpd_members", rsvpd_members); */
    if (banner_image !== null) {
      formField.append("gallery", gallery);
    }

    if (gallery !== null) {
      formField.append("gallery", gallery);
    }

    createEvent(formField).then((response) => {
      console.log(response.data);
      navigate.push("/");
    });
  };

  return (
    <form className=" createEvent w-75 mx-auto shadow p-5 flex-row">
      <h1 className="text-center mb-4">Add An Event</h1>
      Event Name
      <div class="col-md-6">
        <input
          type="text"
          className="form-control form-control-lg "
          placeholder="Event Name"
          value={event_name}
          onChange={(e) => setEventName(e.target.value)}
        />
      </div>
      Despcription
      <div className="col mb-2">
        <textarea
          rows="6"
          type="text"
          className="form-control form-control-lg"
          placeholder="Description of Event"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      Date/Time
      <div className="row mb-2">
        <div class="col col-md-8">
          <input
            className="form-control form-control-lg"
            type="date"
            id="start"
            value="2018-07-22"
            min="2022-01-01"
            max="3050-12-31"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div class="col col-md-4">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Time: 3pm, 3:00pm, 3pm-4pm"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
      Address
      <div className="col mb-3">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter street address"
          value={address_line}
          onChange={(e) => setAddressLine(e.target.value)}
        />
      </div>
      <div className="row mb-2 flex-row">
        <div className="col col-md-6">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div class="col mb-2 flex-sm-column-reverse">
          <select
            name="state"
            className="form-control form-control-lg"
            placeholder="State"
            name="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="LA">Louisiana</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option selected value="LA">
              Louisiana
            </option>
            <option value="KY">Kentucky</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>

        <div class="col">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Zip Code"
            name="Zip Code"
            value={zip_code}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
      </div>
      Contact Details
      <div className="row mb-3">
        <div className="col col-md-4">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Contact Name"
            value={contact_name}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>

        <div className="col col-md-4">
          <input
            type="tel"
            className="form-control form-control-lg"
            placeholder="Contact phone"
            value={contact_number}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>

        <div className="col col-md-4">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Contact Email Address"
            value={contact_email}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col ">
          Fees
          <input
            type="text"
            className=" col-auto form-control form-control-lg"
            placeholder="Registration Fee $0.00"
            value={registration_fees}
            onChange={(e) => setRegistrationFees(e.target.value)}
          />
        </div>

        <div className="col ">
          {" "}
          Event Images
          <input
            type="file"
            multiple
            className="form-control"
            onChange={(e) => setGallery(e.target.files[0])}
          />
        </div>
        <div className="col ">
          Banner Image
          <input
            type="file"
            className="form-control"
            onChange={(e) => setBannerImage(e.target.files[0])}
          />
        </div>
      </div>
      <a className="btn btn-warning " onClick={CreateEventInfo}>
        Add Event
      </a>
    </form>
  );
};

export default CreateEvent;

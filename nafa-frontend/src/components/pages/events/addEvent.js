import React, { useState } from "react";
import axios from "axios";

const AddEvent = () => {

  const [event_name, setName] = useState([])
  const [rsvpd_members, setRsvpd_members] = useState([])
  const [date, setDate] = useState([])
  const [location, setLocation] = useState([])
  const [banner_image, setBanner_image] = useState([])
  const [gallery, setGallery] = useState([])
  const [description, setDescription] = useState([])
  const [media, setMedia] = useState([])
  const [registration_fees, setRegistration_fees] = useState([])

  const addEvent = async () => {
    await axios.post('http://127.0.0.1:8000/main/api/event/', { 
    event_name: event_name, 
    rsvp_members: rsvpd_members,
    date: date,
    location: location,
    banner_image: banner_image,
    gallery: gallery,
    description: description,
    media: media,
    registration_fees: registration_fees,
  })
      .then(res => {
        console.log(res.data)
      })
  }

  return (
    <form className="form" onSubmit={addEvent}>
      <label>
        Event Name:<br/>
        <input type="text" name="name" value={event_name} onChange={(e) => setName(e.target.value)} />
        <br/>
        <br/>RSVP Members:<br/>
        <input type="text" name="rsvpd_members" value={rsvpd_members} onChange={(e) => setRsvpd_members(e.target.value)} />
        <br/>
        <br/>Date:<br/>
        <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <br/>
        <br/>Location Name:<br/>
        <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <br/>
        <br/>Banner Image:<br/>
        <input type="file" name="banner_image" value={banner_image} onChange={(e) => setBanner_image(e.target.value)} />
        <br/>
        <br/>Gallery:<br/>
        <input type="file" name="gallery" value={gallery} onChange={(e) => setGallery(e.target.value)} />
        <br/>
        <br/>Description:<br/>
        <input type="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br/>
        <br/>Media:<br/>
        <input type="file" name="media" value={media} onChange={(e) => setMedia(e.target.value)} />
        <br/>
        <br/>Registration Fees:<br/>
        <input type="text" name="registration_fees" value={registration_fees} onChange={(e) => setRegistration_fees(e.target.value)} />
      </label>
      <br/><br/><button type="submit">add</button>
    </form>
  )
}

export default AddEvent
import React, { useState } from "react";
import axios from "axios";

const AddEvent = () => {

  const [name, setName] = useState([])
  const [location, setLocation] = useState([])

  const addEvent = async () => {
    await axios.post('http://127.0.0.1:8000/main/api/event/', { event_name: name, location: location })
      .then(res => {
        console.log(res.data)
      })
  }


  return (
    <form onSubmit={addEvent}>
      <label>
        Event Name:
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <br/>
        Location Name:
        <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <button type="submit">add</button>
    </form>
  )
}

export default AddEvent
import React, { useState } from "react";
import axios from "axios";

const EventsInput = () => {

  const [name, setName] = useState()

  const handleChange = event => {
    setName(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault();

    const thisEvent = {
      name: name,
      // location: this.state.location
    }

    axios.post('http://127.0.0.1:8000/main/api/events/', { thisEvent })
      .then(res => {
        console.log(res)
        console.log(res.data)
      })
  }


  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Event location:
        <input type="text" name="location" onChange={handleChange} />
      </label>
      <button type="submit">add</button>
    </form>
  )
}

export default EventsInput
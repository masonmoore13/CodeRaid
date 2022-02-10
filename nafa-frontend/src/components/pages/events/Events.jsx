import {useState, useEffect} from "react";
import axios from "axios";
import List from "../../../List";

function Event() {

    const [events , setNewEvents] = useState(null)
    const [formEvent, setFormEvent] = useState({
      event_name: "",
      date: ""
    })

    useEffect(() => {
      getEvents()
        } ,[])

    function getEvents() {
      axios({
          method: "GET",
          url:"/events/",
        }).then((response)=>{
          const data = response.data
          setNewEvents(data)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            }
        })}

    function createEvent(event) {
        axios({
          method: "POST",
          url:"/events/",
          data:{
            event_name: formEvent.event_name,
            date: formEvent.date
           }
        })
        .then((response) => {
          getEvents()
        })

        setFormEvent(({
          event_name: "",
          date: ""}))

        event.preventDefault()
    }

    function DeleteNote(id) {
        axios({
          method: "DELETE",
          url:`/events/${id}/`,
        })
        .then((response) => {
          getEvents()
        })
    }

    function handleChange(event) { 
        const {value, name} = event.target
        setFormEvent(prevEvent => ({
            prevEvent, [name]: value})
        )}


  return (

     <div className=''>

        <form className="create-event">
          <input onChange={handleChange} text={formEvent.event_name} name="event_name" placeholder="Event Title" value={formEvent.event_name} />
          <textarea onChange={handleChange} name="date" placeholder="date..." value={formEvent.date} />
          <button onClick={createEvent}>Create Event</button>
        </form>

        { events && events.map(event => <List
        key={event.id}
        id={event.id}
        event_name={event.title}
        date={event.date} 
        deletion ={DeleteNote}
        />
        )}

    </div>

  );
}

export default Event;
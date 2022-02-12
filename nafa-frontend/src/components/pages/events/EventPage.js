import React from "react";
import CreateEvent from "./CreateEvent";
import ShowEvents from "./ShowEvents";


export default function EventPage() {
  return (
      <div className="contact-container">
        
        <ShowEvents />
        <CreateEvent />
      </div>
  );
}

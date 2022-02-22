import React from "react";
import "./contact.css";

export default function Contact() {
  return (
      <div className="contact-container">
        <h1>Contact Us</h1>
        <hr />
        <br />

        <div>Your Name *</div>
        <input type="text" id="name" />

        <br />
        <br />

        <div>Your Email *</div>
        <input type="text" id="name" />

        <br />
        <br />

        <div>Feedback Category *</div>
        <select name="feedback" id="feedback">
          <option value="website-feedback">Website Feedback</option>
          <option value="membership-issue">Membership Issue</option>
        </select>

        <br />
        <br />

        <div>Feedback *</div>
        <input
          type="text"
          id="name"
          className="feedback"
          placeholder="Please leave your feedback here."
        />
      </div>
  );
}

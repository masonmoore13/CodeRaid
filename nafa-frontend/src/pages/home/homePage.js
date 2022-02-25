import React from "react";
import "./homePage.css";

export default function Home() {
  
  return (
    <div className="home-content">
      
      {/* title of the page */}
      <h1 className="home-title">Welcome to Neville Alumni and Friends Association!</h1>
      
      {/* container holding the cards */}
      <div className="flex-container">

        {/* news and update card */}
        <div className="card">
          <div className="card-header">
            <h4>News and Updates</h4>
          </div>
          <hr />
          <ul>
            <li>Update Here</li>
            <li>News Here</li> {/* have to use react props to change the news/updates here */}
            <li>News Here</li>
          </ul>
        </div>

        {/* events card */}
        <div className="card">
          <div className="card-header">
            <h4>Events</h4>
          </div>
          <hr />
          <ul>
            <li>Event Here</li>
            <li>Event Here</li> {/* have to use react props to show events here */}
            <li>Event Here</li>
          </ul>
        </div>

        {/* sign-in/register card */}
        <div className="card">
          <div className="card-header">
            <h4>Sign-In/Register</h4>
          </div>
          <hr />
          <div style={{ textAlign: "center" }}>Register here</div>
        </div>

      </div>
      
      <br /><br /><br /><br /><br />
      
      {/* gallery title */}
      <h4 style={{ paddingLeft: "3em" }}>Gallery</h4>
      <hr />
      
      {/* gallery container */}
      <div className="gallery" id="gallery">
        
        {/* image inside container */}
        <img id="pic" className="home-images" src="https://www.nevillealumni.org/sites/default/files/styles/front_page_slider/public/IMG_7189.JPG?itok=rYXn3Mg8" /> {/* have to use react props to change the photos here */}
        
      </div>
    </div>
  );
}

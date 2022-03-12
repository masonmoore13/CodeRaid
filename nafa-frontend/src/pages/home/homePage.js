import React from "react";
import "./homePage.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Home() {
  return (
    <Container fluid className="home-content w-100">
      {/* title of the page */}
      <h1 className="home-title">
        Welcome to Neville Alumni and Friends Association!
      </h1>
      
      <Row className="w-100 justify-content-between mx-auto">

        <Col>
        {/* news and update card */}
        <div className="card">
          <div className="card-header">
            <h4>News and Updates</h4>
          </div>
          <ul>
            <li>Update Here</li>
            <li>News Here</li>{" "}
            {/* have to use react props to change the news/updates here */}
            <li>News Here</li>
          </ul>
        </div>
        </Col>

        <Col>
        {/* events card */}
        <div className="card">
          <div className="card-header">
            <h4>Events</h4>
          </div>
          <ul>
            <li>Event Here</li>
            <li>Event Here</li>{" "}
            {/* have to use react props to show events here */}
            <li>Event Here</li>
          </ul>
        </div>
        </Col>

        <Col className="d-flex">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FNeville-Alumni-and-Friends-Association-310455590523&tabs=timeline&width=550&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          height="600"
          title="facebookPage"
          className="fbPage"
        />
        </Col>
        
        </Row>

      <br />

      {/* gallery title */}
      <h4 style={{ paddingLeft: "3em" }}>Gallery</h4>
      <hr />

      {/* gallery container */}
      <div className="gallery" id="gallery">
        {/* image inside container */}
        <img
          id="pic"
          className="home-images"
          src="https://www.nevillealumni.org/sites/default/files/styles/front_page_slider/public/IMG_7189.JPG?itok=rYXn3Mg8"
        />{" "}
        {/* have to use react props to change the photos here */}
      </div>
    </Container>
  );
}

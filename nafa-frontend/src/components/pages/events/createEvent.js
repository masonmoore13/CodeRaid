import React, { Component } from 'react'
import { Container , Form, Col, Button} from 'react-bootstrap'
const axios = require('axios').default;

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rsvpd_members: '',
      event_name: '',
      date: '',
      location: '',
      gallery: '',
      description: '',
      media: '',
      registration_fees: '',
    };
    this.handleChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
onChange = (e) => this.setState({ [e.target.name]: e.target.value });
handleSubmit(event) {
    axios.post('main/api/event', {
        rsvpd_members: this.state.rsvpd_members,
        event_name: this.state.event_name,
        date: this.state.date,
        location: this.state.location,
        gallery: this.state.gallery,
        description: this.state.description,
        media: this.state.media,
        registration_fees: this.state.registration_fees,
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    event.preventDefault();
}
render() {
  return (
      <Container style={{ marginTop: '100px' }}>
        <h1>Add Event</h1>
        <Form style={{ margin: '50px' }} >
          <Form.Row>
            <Col>
               <Form.Control placeholder="RSVP'd Members" name="rsvpd_members" value={this.state.rsvpd_members} onChange={this.onChange}/>
            </Col>
            <Col>
               <Form.Control placeholder="event Name" name="event_name" value={this.state.event_name} onChange={this.onChange}/>
            </Col>
            <Col>
               <Form.Control placeholder="date" name="date" value={this.state.date} onChange={this.onChange}/>
            </Col>
            <Col>
               <Form.Control placeholder="location" name="location" value={this.state.location} onChange={this.onChange}/>
            </Col>
            <Col>
               <Form.Control placeholder="gallery " name="gallery" value={this.state.gallery} onChange={this.onChange}/>
            </Col>
            <Col>
               <Form.Control placeholder="description" name="description" value={this.state.description} onChange={this.onChange}/>
            </Col>
            <Col>
               <Form.Control placeholder="media" name="media" value={this.state.media} onChange={this.onChange}/>
            </Col>
            <Col>
               <Form.Control placeholder="registration_fees" name="registration_fees" value={this.state.registration_fees} onChange={this.onChange}/>
            </Col>
          </Form.Row>
          <Button style={{ margin: '30px', float: 'right' }} onClick={this.handleSubmit}>Add Event</Button>
       </Form>
     </Container>
      )
   }
}
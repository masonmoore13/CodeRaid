import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
const axios = require("axios");

export default class Events extends Component {
  state = {
    isLoading: true,
    event: [],
    error: null,
  };
  constructor(props) {
    super(props);
  }
  fetchEmp() {
    fetch("main/api/event")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          event: data,
          isLoading: false,
        })
      )
      .catch((error) => this.setState({ error, isLoading: false }));
  }
  componentDidMount() {
    this.fetchEmp();
  }
  render() {
    return (
      <Container style={{ marginTop: "100px" }}>
        <Button
          variant="secondary"
          style={{ float: "right", margin: "20px" }}
          onClick={() => this.props.history.push("/createEvent")}
        >
          Add an Event
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Event Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!this.state.isLoading
              ? this.state.event.map((event) => {
                  return (
                    <tr key={event.id}>
                      <td>{event.id}</td>
                      <td>{event.event_name}</td>
                      <td>{event.date}</td>
                      <td>{event.description}</td>
                      <td>
                        <Button
                          onClick={() =>
                            this.props.history.push(`/updateEvent/${event.id}`)
                          }
                        >
                          Update
                        </Button>{" "}
                        <Button variant="danger">Delete</Button>
                      </td>
                    </tr>
                  );
                })
              : "LOADING"}
          </tbody>
        </Table>
      </Container>
    );
  }
}
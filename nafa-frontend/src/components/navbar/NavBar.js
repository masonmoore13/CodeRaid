import React from "react";
import {
  Nav,
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="navigation">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            NAFA
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavDropdown title="Events" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/event">Events</NavDropdown.Item>
                <NavDropdown.Item href="/event/createEvent">
                  Create Event
                </NavDropdown.Item>
                <NavDropdown.Item href="/event/Calendar">
                  Calendar
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>

              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-warning">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div></div>
    </div>
  );
}

export default NavBar;

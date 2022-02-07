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
import { BrowserRouter as Router, Link } from "react-router-dom";
import './navbar.css'

function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="navigation">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">NAFA</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/events">
                Events
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>

              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
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
      <div>
      </div>
    </div>
  );
}

export default NavBar;

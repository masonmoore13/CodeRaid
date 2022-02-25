import React from "react";
import {
  Nav,
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
  NavLink,
  Dropdown,
} from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { AiOutlineUser, AiOutlineLogin } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { loginError } from "../../pages/login/loginSlice";

function NavBar() {
  const navigate = useNavigate();

  const { isAuth } = useSelector((state) => state.login);
  const {username } = useSelector((state)=> state.user.user)
  const dispatch = useDispatch();
  const logOut = () => {
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("nafaSite");
    dispatch(loginError(""))
    navigate("");
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="navigation">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "150px" }}
              navbarScroll
            >
              <NavDropdown title="Events" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/event">All Events</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/event/createEvent">
                  Create Event
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
            </Nav>

            {!isAuth ? (
              <Nav>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login <AiOutlineLogin />
                </Nav.Link>
              </Nav>
            ) : (
              <Nav >
                <NavDropdown align={{ lg: 'end' }}
                  title={<AiOutlineUser />}
                 flip={true}
                >
                  
                  <NavDropdown.Item href="#">
                    {username}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                  
                </NavDropdown>
                  
                 
              </Nav>
            )}

            {/* <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-warning">Search</Button>
            </Form> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div></div>
    </div>
  );
}

export default NavBar;

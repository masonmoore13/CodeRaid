import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { LinkContainer } from "react-router-bootstrap";
import { AiOutlineUser, AiOutlineLogin } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { loginError } from "../../pages/login/loginSlice";
import { getUserFaliure } from "../../pages/home/userSlice";

function NavBar() {
  const navigate = useNavigate();

  const { isAuth } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const logOut = () => {
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("nafaSite");
    dispatch(loginError(""));
    dispatch(getUserFaliure(""));
    navigate("/");
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        bg="dark"
        variant="dark"
        expand="lg"
        className="navigation"
      >
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>Home</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="me-auto my-2 my-lg-0"
              // style={{ maxHeight: "150px" }}
              // navbarScroll
            >
              <NavDropdown title="Events" id="navbarScrollingDropdown">
                <LinkContainer to="/event">
                  <NavDropdown.Item>All Events</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item as={Link} to="/event/createEvent">
                  Create Event
                </NavDropdown.Item>
              </NavDropdown>
              <LinkContainer to="/contact">
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/gallery">
                <Nav.Link>Gallery</Nav.Link>
              </LinkContainer>
            </Nav>

            {!isAuth ? (
              <div className="ml-auto d-flex auth-button">
                <LinkContainer to="/signup" className="auth-button">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login" className="auth-button">
                  <Nav.Link>
                    Login <AiOutlineLogin />
                  </Nav.Link>
                </LinkContainer>
              </div>
            ) : (
              <NavDropdown align={{ lg: "end" }} title={<AiOutlineUser />}>
                <NavDropdown.Item href="#">
                  {user ? user.username : ""}
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/dashboard/userprofile">Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/dashboard/home">Dashboard</Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
              </NavDropdown>
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
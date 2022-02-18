import React, { useState, useEffect } from "react";
import { Alert, Button, Form, Container, Row, Col } from "react-bootstrap";
import ButtonWithProgress from "../../components/buttonWithProgress/ButtonWithProgress";
import Input from "../../components/input/Input";
import "./loginpage.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const onClickLogin = (e) => {
    e.preventDefault();
    console.log("login clickerd");
  };

  let disableLogin = false;
  if (username === "") {
    disableLogin = true;
  }
  if (password === "") {
    disableLogin = true;
  }

  return (
    <div className="login-container">
      <div className="jumbotron">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Login</h1>
              <hr />
              <Form>
                <Input
                  label="Username"
                  type="text"
                  placeholder="Your Username"
                  name="username"
                  onChange={handleOnChange}
                  //   hasError={errors.username && true}
                  //   error={errors.username}
                />

                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleOnChange}
                  // hasError={errors.password && true}
                  // error={errors.password}
                />

                {/* {apiError && (
        <div className="col-12 mb-3">
          <Alert as="text" variant="danger">{apiError}</Alert>
        </div>
      )} */}
                <div className="mt-4 d-flex justify-content-center">
                  <ButtonWithProgress
                    onClick={onClickLogin}
                    disabled={disableLogin}
                    text="Login"
                    // pendingApiCall={pendingApiCall}
                  />
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;

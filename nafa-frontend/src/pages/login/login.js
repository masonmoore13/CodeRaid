import React, { useState, useEffect } from "react";
import { Alert, Button, Form, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ButtonWithProgress from "../../components/buttonWithProgress/ButtonWithProgress";
import Input from "../../components/input/Input";
import "./loginpage.css";
import { loginPending, loginSuccess, loginError } from "./loginSlice";
import { userLogin } from '../../api/userApi'


function Login() {
  const dispatch = useDispatch();

  const { isLoading, isAuth, error } = useSelector((state) => state.login);
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

    // login is pending before the api call
    dispatch(loginPending());

    // call the api, using try catch easier to understand
      userLogin({username, password}).then(isAuth=>{
        dispatch(loginSuccess())
      }).catch(error =>{
        dispatch(loginError(error.response.data.detail))
      })
    // login is not pending after calling the api

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

              {error && (
                <div className="col-12 mb-3 mt-3">
                  <Alert as="text" variant="danger">
                    {error}
                  </Alert>
                </div>
              )}
              <div className="mt-4 mb-2 d-flex justify-content-center">
                <ButtonWithProgress
                  onClick={onClickLogin}
                  disabled={disableLogin || isLoading}
                  text="Login"
                  pendingApiCall={isLoading}
                />
              </div>
            </Form>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col>
            <a href="#!">Forgot password?</a>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Login;

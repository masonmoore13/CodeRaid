import React, { useState } from "react";
import { Alert, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ButtonWithProgress from "../../components/buttonWithProgress/ButtonWithProgress";
import Input from "../../components/input/Input";
import "./loginpage.css";
import { useNavigate } from "react-router-dom";
import { loginError, loginPending, loginSuccess } from "./loginSlice";
import { userLogin } from "../../api/userApi";
import { getUserProfile } from "../home/userActions";
import { Link } from "react-router-dom";
import RecaptchaComponent from "../../components/recaptcha/RecaptchaComponent";


function Login() {
  // used to dispatch actions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.login);

  // username and password state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  const handleRecapthca = (value) => {
    setRecaptchaVerified(true);
  };

  const handleErrorRecaptcha = () => {
    setRecaptchaVerified(false);
  };

  // state changes of username and password
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

  // when the login button is clicked
  const onClickLogin = (e) => {
    e.preventDefault();
    // pending before the api call
    dispatch(loginPending());
    // call the api
    userLogin({ username, password })
      .then((res) => {
        dispatch(loginSuccess());
        dispatch(getUserProfile());
        if (!error) {
          navigate("/");
        }
      })
      .catch((error) => {
        setUsername("");
        setPassword("");
        dispatch(loginError(error.response.data.detail));
      });
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
                value={username}
                //   hasError={errors.username && true}
                //   error={errors.username}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="password"
                onChange={handleOnChange}
                value={password}
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

              <RecaptchaComponent
                handleRecapthca={handleRecapthca}
                handleErrorRecaptcha={handleErrorRecaptcha}
              />
              <div className="mt-4 mb-2 d-flex justify-content-center">
                <ButtonWithProgress
                  onClick={onClickLogin}
                  disabled={disableLogin || isLoading || !recaptchaVerified}
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
            <div className="options">
              <a href="#!">Forgot password?</a>
              <Link to="/signup">SignUp?</Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Login;

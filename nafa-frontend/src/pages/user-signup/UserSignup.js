import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import ButtonWithProgress from "../../components/buttonWithProgress/ButtonWithProgress";

import Input from "../../components/input/Input";
import "./signUpPage.css";

const defaultProp = {
  postSignup: () => {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  },
};

function UserSignup({ props, actions = defaultProp }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onInputChange = (event) => {
    const { value, name } = event.target;

    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });

    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: undefined,
      };
    });
  };

  const onClickSignup = () => {
    const { username, email, password } = form;
    const user = {
      username: username,
      email: email,
      password: password,
    };
    setPendingApiCall(true);
    actions
      .postSignup(user)
      .then((response) => {
        setPendingApiCall(false);
        navigate("/login");
      })
      .catch((apiError) => {
        if (apiError.response.data) {
          setErrors(apiError.response.data);
        }
        setPendingApiCall(false);
      });
  };

  let passwordRepeatError;
  const { password, passwordRepeat } = form;
  if (password || passwordRepeat) {
    passwordRepeatError =
      password === passwordRepeat ? "" : "Does not match to password";
  }

  return (
    <div className="signUp-container">
      <div className="jumbotron">
        <Row>
          <Col>
            <h2 className="text-center">Sign Up</h2>
            <hr />
            <Form>
              <Input
                label="Username"
                type="text"
                placeholder="Your Username"
                name="username"
                onChange={onInputChange}
                hasError={errors.username && true}
                error={errors.username}
              />

              <Input
                label="Email address"
                type="email"
                name="email"
                placeholder="name@example.com"
                onChange={onInputChange}
                hasError={errors.email && true}
                error={errors.email}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="password"
                onChange={onInputChange}
                hasError={errors.password && true}
                error={errors.password}
              />

              <Input
                label="Repeat your Password"
                type="password"
                name="passwordRepeat"
                placeholder="Repeat your password"
                onChange={onInputChange}
                hasError={passwordRepeatError && true}
                error={passwordRepeatError}
              />
              <div className="signup-option">
                <ButtonWithProgress
                  onClick={onClickSignup}
                  disabled={
                    pendingApiCall || passwordRepeatError ? true : false
                  }
                  pendingApiCall={pendingApiCall}
                  text="Sign up"
                ></ButtonWithProgress>
                <span>Have an Account? <Link to="/login">Login?</Link></span>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default UserSignup;

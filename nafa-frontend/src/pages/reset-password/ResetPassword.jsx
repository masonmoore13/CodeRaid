import React, { useState } from "react";
import "./resetpassword.css";

import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Input from "../../components/input/Input";
import ButtonWithProgress from "../../components/buttonWithProgress/ButtonWithProgress";
import RecaptchaComponent from "../../components/recaptcha/RecaptchaComponent";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [message, setMessage] = useState(
    "Please check email for the password link"
  );

  const handleRecapthca = (value) => {
    setRecaptchaVerified(true);
  };

  const handleErrorRecaptcha = () => {
    setRecaptchaVerified(false);
  };

  const handleOnChange = () => {};

  const onClickResetPassword = () => {};

  return (
    <div className="reset-password-container d-flex flex-column">
      <Row>
        <div
          className="col-md-12 col-md-offset-4 d-flex justify-content-center mt-5"
          align="center"
        >
          <Alert variant="success">{message}</Alert>
        </div>
      </Row>
        <div className="jumbotron">
          <Container>
            <Row>
              <Col>
                <h1 className="text-center">Reset Password</h1>
                <hr />
                <Form autoComplete="off">
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter Email"
                    required
                  />
                  <RecaptchaComponent
                    handleRecapthca={handleRecapthca}
                    handleErrorRecaptcha={handleErrorRecaptcha}
                  />
                  <div className="mt-3 mb-2 d-flex justify-content-center">
                    <ButtonWithProgress
                      onClick={onClickResetPassword}
                      text="Reset Password"
                      disabled={!recaptchaVerified}
                    />
                  </div>
                </Form>
                <hr />
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="options">
                  <Link to="/login">Login?</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
  );
};

export default ResetPassword;

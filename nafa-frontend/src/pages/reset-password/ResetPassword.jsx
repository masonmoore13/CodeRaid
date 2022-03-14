import React, { useState } from "react";
import "./resetpassword.css";

import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Input from "../../components/input/Input";
import ButtonWithProgress from "../../components/buttonWithProgress/ButtonWithProgress";
import RecaptchaComponent from "../../components/recaptcha/RecaptchaComponent";
import { resetPasswordRequest } from "../../api/apiCalls";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccessAlert, setShowSuccsessAlert] = useState(false);

  const handleRecapthca = (value) => {
    setRecaptchaVerified(true);
  };

  const handleErrorRecaptcha = () => {
    setRecaptchaVerified(false);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  if (setShowSuccsessAlert) {
    setTimeout(() => {
      setShowSuccsessAlert(false);
    }, 5000);
  }

  const onClickResetPassword = (e) => {
    e.preventDefault();
    // api call is pending
    setPendingApiCall(true);
    resetPasswordRequest(email)
      .then((response) => {
        // api call succeeded
        setPendingApiCall(false);
        setMessage(response.data.success);
        setShowSuccsessAlert(true);
      })
      .catch((error) => {
        setError(error.response.data.error);
        setPendingApiCall(false);
      });
  };

  return (
    <div className="reset-password-container d-flex flex-column">
      {message && message.length && showSuccessAlert && (
        <Row>
          <div
            className="col-md-12 col-md-offset-4 d-flex justify-content-center mt-5"
            align="center"
          >
            <Alert variant="success">{message}</Alert>
          </div>
        </Row>
      )}
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
                    disabled={
                      pendingApiCall ||
                      !recaptchaVerified
                    }
                    pe
                    pendingApiCall={pendingApiCall}
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

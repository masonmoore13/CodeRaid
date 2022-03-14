import React, { useState } from "react";
import "./reserpassword.css"

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ResetPassword = () => {

  const [email,setEmail] = useState("")

  const handleOnResetSubmit = ()=>{

  }

  return (
    <div className="reset-password-container">
      <div className="jumbotron">
        <Container>
          <Row>
            <Col>
              <h1 className="text-info text-center">Reset Password</h1>
              <hr />
              <Form autoComplete="off" onSubmit={handleOnResetSubmit}>
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter Email"
                    required
                  />
                </Form.Group>

                <Button type="submit">Reset Password</Button>
              </Form>
              <hr />
            </Col>
          </Row>

          <Row>
            <Col>
              <Link to="/login">Login?</Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ResetPassword;

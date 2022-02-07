import React from "react";
import "./loginpage.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./loginpage"

export default function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <hr/>
      <Form >
        <Form.Group className="email" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <br />

        <Form.Group className="username" controlId="formBasicPassword">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Username" />
        </Form.Group>

        <br />

        <Form.Group className="password" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <br />

        <Button variant="warning" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

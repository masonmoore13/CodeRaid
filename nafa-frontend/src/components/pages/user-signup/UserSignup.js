import React from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button'

function UserSignup() {
  return (
    <div>
      <h1>Sign Up</h1>
       <Form>
        <Form.Group className="w-75 mb-2">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Username"
            name="username"
          />
        </Form.Group>

        <Form.Group className="w-75 mb-2">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>

        <Form.Group className="w-75 mb-2">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="password" placeholder="password" />
        </Form.Group>

        <Form.Group className="w-75 mb-2">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="password" placeholder="Repeat your password" />
        </Form.Group>

        <Button variant="primary">Sign up</Button>{' '}

      </Form> 

    

    </div>
  );
}

export default UserSignup;

import React, { useCallback, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner'

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

  const onInputChange = (event) => {
    const { value, name } = event.target;

    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
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
    actions.postSignup(user).then(response=>{
      setPendingApiCall(false);
    }).
    catch((error)=>{
      console.log("testtt")
      setPendingApiCall(false);
    })

  };



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
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="w-75 mb-2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="w-75 mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="password"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="w-75 mb-2">
          <Form.Label>Repeat Your Password</Form.Label>
          <Form.Control
            type="password"
            name="passwordRepeat"
            placeholder="Repeat your password"
            onChange={onInputChange}
          />
        </Form.Group >
        <Button className="d-flex justify-content-center" onClick={onClickSignup} disabled={pendingApiCall}>
        {pendingApiCall && <Spinner className="m-1" animation="border" role="status" size="sm">
            <span className="visually-hidden text-light">Loading...</span>
          </Spinner>}
          Sign up
        </Button>{" "}
      </Form>
    </div>
  );
}

export default UserSignup;

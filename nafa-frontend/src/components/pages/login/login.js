import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Input from "../../input/Input";

function Login(props) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [apiError, setApiError] = useState();

  const onInputChange = (event) => {
    const { value, name } = event.target;

    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <Form>
        <h1>Login</h1>
        <Input
          label="Username"
          type="text"
          placeholder="Your Username"
          name="username"
          onChange={onInputChange}
          //   hasError={errors.username && true}
          //   error={errors.username}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="password"
          onChange={onInputChange}
          // hasError={errors.password && true}
          // error={errors.password}
        />

        <Button
          className="d-flex justify-content-center"
          //   onClick={onClickSignup}
          //   disabled={pendingApiCall || passwordRepeatError ? true : false}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;

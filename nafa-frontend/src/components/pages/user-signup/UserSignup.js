import React, { useCallback, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Input from "../../input/Input";

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
    actions
      .postSignup(user)
      .then((response) => {
        setPendingApiCall(false);
      })
      .catch((apiError) => {
        if (apiError.response.data && apiError.response.data.validationErrors) {
          setErrors(apiError.response.data.validationErrors);
        }
        setPendingApiCall(false);
      });
  };


  let passwordRepeatError;
  const { password, passwordRepeat } = form;
  if (password || passwordRepeat) {
    passwordRepeatError =
      password === passwordRepeat ? '' : 'Does not match to password';
  }


  return (
    <div>
      <h1>Sign Up</h1>
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

        <Button
          className="d-flex justify-content-center"
          onClick={onClickSignup}
          disabled={pendingApiCall || passwordRepeatError ? true : false}
        >
          {pendingApiCall && (
            <Spinner className="m-1" animation="border" role="status" size="sm">
              <span className="visually-hidden text-light">Loading...</span>
            </Spinner>
          )}
          Sign up
        </Button>{" "}
      </Form>
    </div>
  );
}

export default UserSignup;

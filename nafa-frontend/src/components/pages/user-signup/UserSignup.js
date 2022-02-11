import React, { useCallback, useState } from "react";
import { Form } from "react-bootstrap";
import ButtonWithProgress from "../../buttonWithProgress/ButtonWithProgress";
import Spinner from "react-bootstrap/Spinner";
import Input from "../../input/Input";
import './signUpPage.css';

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

    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: undefined
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
    <div className="signUp-container">
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

        <ButtonWithProgress
          onClick={onClickSignup}
          disabled={pendingApiCall || passwordRepeatError ? true : false}
          pendingApiCall={pendingApiCall}
          text="Sign up"
        >
        </ButtonWithProgress>
      </Form>
    </div>
  );
}

export default UserSignup;

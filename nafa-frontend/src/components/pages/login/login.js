import React, { useState, useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import ButtonWithProgress from "../../buttonWithProgress/ButtonWithProgress";
import Input from "../../input/Input";


const defaultProp = {
  postLogin: () => {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  },
};

function Login({ props, actions = defaultProp }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [apiError, setApiError] = useState("Login Failed");
  const [pendingApiCall, setPendingApiCall] = useState(false);

 
  const onInputChange = (event) => {
    const { value, name } = event.target;

    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });

    setApiError(undefined);
    
  };

  const onClickLogin = () => {
    const { username, password } = form;
    const user = {
      username: username,
      password: password,
    };
    setPendingApiCall(true);
    actions.postLogin(user)
    .then(response =>{
        setPendingApiCall(false);
    })
    .catch((error) => {
        if (error.response) {
            setApiError(error.response.data.message);
            setPendingApiCall(false);  
          } 
      });
  };

  let disableLogin = false;
  if (form.username === "") {
    disableLogin = true;
  }
  if (form.password === "") {
    disableLogin = true;
  }

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

        {apiError && (
        <div className="col-12 mb-3">
          <Alert as="text" variant="danger">{apiError}</Alert>
        </div>
      )}

<ButtonWithProgress
          onClick={onClickLogin}
          disabled={disableLogin || pendingApiCall}
          text="Login"
          pendingApiCall={pendingApiCall}
        />
      </Form>
    </div>
  );
}

export default Login;

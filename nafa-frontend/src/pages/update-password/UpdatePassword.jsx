import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updatePassword } from "../../api/apiCalls";
import ButtonWithProgress from "../../components/buttonWithProgress/ButtonWithProgress";

import Input from "../../components/input/Input";
import RecaptchaComponent from "../../components/recaptcha/RecaptchaComponent";

const UpdatePassword = () => {
  const [form, setForm] = useState({
    password: "",
    passwordRepeat: "",
  });

  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [errors, setErrors] = useState({});
  let searchParams = useSearchParams();

  let uidb64 = searchParams.get("uidb64");
  let token = searchParams.get("token");
  let navigate = useNavigate()
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  const passVerification = {
    isLengthy: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
  };

  const [passwordError, setPasswordError] = useState(passVerification);

  const handleRecapthca = (value) => {
    if (errors) {
    }
    setRecaptchaVerified(true);
  };

  const handleErrorRecaptcha = () => {
    setRecaptchaVerified(false);
  };

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
        [name]: undefined,
      };
    });

    if (name === "password") {
      const isLengthy = value.length >= 8;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);

      setPasswordError({
        ...passwordError,
        isLengthy,
        hasUpper,
        hasLower,
        hasNumber,
      });
    }
  };

  const onClickResetPassword = (e) => {
    e.preventDefault();
    // api call pending
    setPendingApiCall(true);

    const updatePasswordObject = {
      password,
      uidb64,
      token,
    };

    // make api call
    updatePassword(updatePasswordObject)
      .then((response) => {
        console.log(response);

        // navigate to login page with the proper message
        navigate("/login",{ state: {message:"Registration Successful. Please Check Email to verify your account"} } );

      })
      .catch((errors) => {
          setErrors(errors.response.data)

          // api call has finished
          setPendingApiCall(false)
      });

    // catch the error
  };

  let passwordRepeatError;
  const { password, passwordRepeat } = form;
  if (password || passwordRepeat) {
    passwordRepeatError =
      password === passwordRepeat ? "" : "Does not match to password";
  }

  return (
    <div className="signUp-container">
      <div className="jumbotron">
        <Row>
          <Col>
            <h2 className="text-center">Update Password</h2>
            <hr />
            <Form>
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
                label="Confirm your Password"
                type="password"
                name="passwordRepeat"
                placeholder="Repeat your password"
                onChange={onInputChange}
                hasError={passwordRepeatError && true}
                error={passwordRepeatError}
              />
              <ul className="mb-4 mt-4">
                <li
                  className={
                    passwordError.isLengthy ? "text-success" : "text-danger"
                  }
                >
                  Min 8 characters:{" "}
                </li>
                <li
                  className={
                    passwordError.hasUpper ? "text-success" : "text-danger"
                  }
                >
                  At least one Upper Case{" "}
                </li>
                <li
                  className={
                    passwordError.hasLower ? "text-success" : "text-danger"
                  }
                >
                  At least one Lower Case
                </li>
                <li
                  className={
                    passwordError.hasNumber ? "text-success" : "text-danger"
                  }
                >
                  At least One number
                </li>
              </ul>
              <RecaptchaComponent
                handleRecapthca={handleRecapthca}
                handleErrorRecaptcha={handleErrorRecaptcha}
              />

              <div className="signup-option">
                <ButtonWithProgress
                  onClick={onClickResetPassword}
                  disabled={
                    Object.values(passwordError).includes(false) ||
                    pendingApiCall ||
                    passwordRepeatError
                      ? true
                      : false || !recaptchaVerified
                  }
                  pendingApiCall={pendingApiCall}
                  text="Update Password"
                ></ButtonWithProgress>
                <span>
                  <Link to="/login">Login?</Link>
                </span>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UpdatePassword;

import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const RecaptchaComponent = ({ handleRecapthca }) => {
  return (
    <ReCAPTCHA
      sitekey="6LeyrKQeAAAAANzwYlkhakli2O2gIbC0dNHdM81p"
      onChange={handleRecapthca}
      theme = "dark"
    />
  );
};

export default RecaptchaComponent;
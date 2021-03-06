import React from "react";
import { Form } from "react-bootstrap";
import "./input.css";

const defaultChange = () => {};

const Input = (props) => {
  let inputClassName = "";
  if (props.hasError !== undefined) {
    inputClassName += props.hasError ? "is-invalid" : "is-valid";
  }

  let onChange = props.onChange !== undefined ? props.onChange : defaultChange;

  return (
    <div>
      {props.label && <Form.Label column="lg">{props.label}</Form.Label>}
      <Form.Group>
        <Form.Control
          name={props.name}
          className={inputClassName}
          type={props.type || "text"}
          placeholder={props.placeholder}
          value={props.value}
          onChange={onChange}
          htmlSize="30"
        />
      </Form.Group>
      {props.hasError && (
        <span className="invaild-feedback">
          <span className="errorColor">{props.error}</span>
        </span>
      )}
    </div>
  );
};

export default Input;

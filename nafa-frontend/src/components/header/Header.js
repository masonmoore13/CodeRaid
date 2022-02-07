import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import nafaLogo from "../../Assets/images/nafa-logo.png";
import "./header.css";
import Contact from "../pages/contact/contactPage";

export default function Header() {
  return (
    <div className="hDiv">
      {/* shows logo in the navbar */}
      <img src={nafaLogo} width="60px" vertic />
      {/* list on the right side of the screen */}
      <ul className="ul">
        <li>(phone number)</li>
        <li><a href="https://www.facebook.com/Neville-Alumni-and-Friends-Association-310455590523">facebook</a></li>
        <li>instagram</li>
        <li>email</li>
      </ul>
    </div>
  );
}


/*Not React-Bootstrap header*/
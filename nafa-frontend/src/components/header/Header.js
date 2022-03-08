import React from "react";
import { Link } from "react-router-dom";
import nafaLogo from "../../Assets/images/nafa-logo.png";
import "./header.css";

export default function Header() {
  return (
    <div className="hDiv">
      {/* shows logo in the navbar */}
      <img src={nafaLogo} width="60px" />
    </div>
  );
}

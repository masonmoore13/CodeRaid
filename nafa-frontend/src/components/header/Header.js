import React from "react";
import nafaLogo from "../../Assets/images/nafa-logo.png";
import "./header.css";

export default function Header() {
  return (
    <div className="hDiv">
      {/* shows logo in the navbar */}
      <img src={nafaLogo} width="60px" vertic />
      {/* list on the right side of the screen */}
      <ul className="ul">
        <li>(phone number)</li>
        <li>facebook</li>
        <li>instagram</li>
        <li>email</li>
      </ul>
    </div>
  );
}


/*Not React-Bootstrap header*/
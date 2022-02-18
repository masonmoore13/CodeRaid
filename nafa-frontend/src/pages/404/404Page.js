import React from "react";
import "./404Page.css";

function PageNotFound() {
  return (
    <div className="container">
      This page could not be found
      <img src="https://i.imgur.com/qIufhof.png" alt="Page Not found"/>
      <a href="/" type="button"  class="btn btn-warning">Go Home</a>
    </div>
  );
}

export default PageNotFound;

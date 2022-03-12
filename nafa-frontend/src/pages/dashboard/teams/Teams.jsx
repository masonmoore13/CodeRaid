import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTeams } from "../../../api/apiCalls";
import { CardGroup, Col, Modal, Button } from "react-bootstrap";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    getTeams()
      .then((response) => {
        console.log(response.data);
        setTeams(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="">
      <h1>
        Teams
        <hr />
      </h1>
      {teams.map((teams, index) => (
        <div className="" border="" key={teams.id}>
          <Link
            className="btn btn-outline-dark btn-warning m-1"
            to={`/dashboard/teams/${teams.category}/`}
          >
            {teams.category}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Teams;

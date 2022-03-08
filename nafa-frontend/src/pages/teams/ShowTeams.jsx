import React, { useState, useEffect } from "react";
import Datatable from "./Datatable";
// import "./profile.css";
 import { getTeams } from "../../api/apiCalls";
// import { Table, Card } from "react-bootstrap";

export default function ProfileSearch() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

useEffect(() => {
  getTeams()
    .then((response) => {
      console.log(response.data);
      setData(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}, []);

  function search(rows) {
    return rows.filter((row) => row.first_name.toLowerCase().indexOf(q) > -1);
  }

  return (
    <div>
      <div>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div>
        <Datatable data={data} />
      </div>
    </div>
  );
}
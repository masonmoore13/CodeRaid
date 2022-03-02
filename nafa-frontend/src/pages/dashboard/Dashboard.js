import React from "react";
import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";

import "./dashboard.css"

const Dashboard = () => {
  return (
    <div className="dashboard-container mt-3">
      {/* Sidebar */}

      <Row>
        <Col md="2" className="sidenav side-bar-col">
          <Sidebar />
        </Col>

        <Col md="10" className="mainpage-col">
          {/* Mainpage */}
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

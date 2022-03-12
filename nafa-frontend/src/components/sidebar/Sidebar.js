import React from "react";
import "./sidebar.css";
import { AiOutlineUser } from "react-icons/ai";
import { MdLineStyle } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sideBarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/dashboard/home" className="sidebarListItem">
              <MdLineStyle className="sidebarIcons" />
              Home
            </Link>
            <Link to="/dashboard/userprofile/" className="sidebarListItem">
              <AiOutlineUser className="sidebarIcons" />
              Profile
            </Link>

            <Link to="#" className="sidebarListItem">
              <MdLineStyle className="sidebarIcons" />
              Contributions
            </Link>
          </ul>
        </div>

        <div className="sideBarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/dashboard/userlist/" className="sidebarListItem">
              <MdLineStyle className="sidebarIcons" />
              Users
            </Link>
            <Link to="#" className="sidebarListItem">
              <AiOutlineUser className="sidebarIcons" />
              Members
            </Link>

            <Link to="/dashboard/teams/" className="sidebarListItem">
              <MdLineStyle className="sidebarIcons" />
              Teams
            </Link>
          </ul>
        </div>

        <div className="sideBarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <Link to="#" className="sidebarListItem">
              <MdLineStyle className="sidebarIcons" />
              Mail
            </Link>
            <Link to="#" className="sidebarListItem">
              <AiOutlineUser className="sidebarIcons" />
              Feedback
            </Link>
            <Link to="#" className="sidebarListItem">
              <MdLineStyle className="sidebarIcons" />
              Messages
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
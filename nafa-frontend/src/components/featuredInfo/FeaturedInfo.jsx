import React from "react";
import "./featuredinfo.css";

const FeaturedInfo = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total Users</span>
        <div className="totalData">
          <span className="totalDataContainer">Users: 600</span>
          <span className="totalDataContainer">Members: 200</span>
        </div>
    </div>

        <div className="featuredItem">
          <span className="featuredTitle">Total Teams</span>
          <div className="totalData">
            <span className="totalDataContainer">Total smart teams: 50</span>
          </div>
        </div>

        <div className="featuredItem">
          <span className="featuredTitle">Total Upcoming Events</span>
          <div className="totalData">
            <span className="totalDataContainer">Upcoming Events: 2</span>
            <span className="totalDataContainer">Completed this month: 5</span>
          </div>
        </div>
      </div>
  );
};

export default FeaturedInfo;

import React from "react";
import "./userprofile.css";
import { data } from "../../../dummyUserData";
import { Button, Form } from "react-bootstrap";

import {
  MdPermIdentity,
  MdOutlineDateRange,
  MdPhoneIphone,
  MdPublish,
} from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";

const Userprofile = () => {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Button variant="success" className="userAddButton">
          Create
        </Button>
      </div>

      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={data.imageUrl} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {data.first_name} {data.middle_name} {data.last_name}{" "}
              </span>
              <span className="userShowCurrentWork">{data.current_work}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>

            <div className="userShowInfo">
              <MdPermIdentity className="userShowIcon" />
              <span className="userShowUserInfoTitle">{data.username}</span>
            </div>

            <div className="userShowInfo">
              <MdOutlineDateRange className="userShowIcon" />
              <span className="userShowUserInfoTitle">{data.birth_date}</span>
            </div>

            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MdPhoneIphone className="userShowIcon" />
              <span className="userShowUserInfoTitle">{data.phone_no}</span>
            </div>

            <div className="userShowInfo">
              <FaAddressCard className="userShowIcon" />
              <span className="userShowUserInfoTitle">
                {data.address_line_1} | {data.city} | {data.state}
              </span>
            </div>

            <span className="userShowTitle">Achievements</span>

            <div className="userShowInfo">
              <GiAchievement className="userShowIcon" />
              <span className="userShowUserInfoTitle">{data.achievements}</span>
            </div>
          </div>
        </div>

        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>

          <Form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Firstname: </label>
                <input
                  type="text"
                  placeholder={data.first_name}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Middlename: </label>
                <input
                  type="text"
                  placeholder={data.last_name}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Maidenname: </label>
                <input
                  type="text"
                  placeholder={data.maiden_name}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Birthdate: </label>
                <input
                  type="date"
                  placeholder={data.birth_date}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Phone No: </label>
                <input
                  type="text"
                  placeholder={data.phone_no}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Address Line 1: </label>
                <input
                  type="text"
                  placeholder={data.address_line_1}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>City: </label>
                <input
                  type="text"
                  placeholder={data.city}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>State: </label>
                <input
                  type="text"
                  placeholder={data.state}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Achievements: </label>
                <input
                  type="textarea"
                  placeholder={data.current_work}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Achievements: </label>
                <input
                  type="textarea"
                  placeholder={data.achievements}
                  className="userUpdateInput"
                />
              </div>
            </div>

            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={data.imageUrl}
                  alt=""
                />
                <label htmlFor="file">
                  <MdPublish size={20} className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <Button variant= "warning" className="userUpdateButton">Update</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;

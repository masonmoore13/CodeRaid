import React, { useEffect, useState } from "react";
import "./userprofile.css";
import { data, userD } from "../../../dummyUserData";
import { Button, Form } from "react-bootstrap";
import userprofile from "../../../Assets/images/userprofile.png";
import {
  MdPermIdentity,
  MdOutlineDateRange,
  MdPhoneIphone,
  MdPublish,
} from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { useSelector } from "react-redux";
import { updateUserProfileById,getUserProfileById } from "../../../api/apiCalls";
import { useNavigate, useParams  } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Userprofile = () => {
  let { user, userProfile } = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const [userProfileData, setUserProfileData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    maiden_name: "",
    grad_year: "",
    birth_date: "",
    phone_no: "",
    address_line_1: "",
    city: "",
    state: "",
    current_work: "",
    has_contrubitions: "",
    achievements: "",
    bio: "",
    profile_picture: "",
  });

  let {id} = useParams()

  useEffect(() => {
    if (!id) {
      setUserProfileData(userProfile);
    }
    
    if(id){
      getUserProfileById(id).then((res)=>{
        console.log(res)
        setUserProfileData(res.data)
      })
    }
  }, [id, userProfile]);

  if (!userProfile) {
    userProfile = data;
    user = userD;
  }

  const notify = () => {
    toast.warn("Your profile has been updated!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    let userId;
    if (!id) {
      console.log(userProfile.id);
      userId = userProfile.id;
    }else{
      userId = id;
    }
    updateUserProfileById(userProfileData, userId)
      .then((res) => {
        console.log(res);
        // notify();
        if(!id){
          navigate("/dashboard/userprofile/")
        }else{
          navigate(`/dashboard/userprofile/${id}/`)
        }
        
        //window.reload();
      })
      .catch((error) => {});
  };

  const onInputChange = (event) => {
    const { value, name } = event.target;

    console.log(name);

    if (event.target.files !== null) {
      console.log(event.target.files[0])
      setUserProfileData((previousForm) => {
        return {
          ...previousForm,
          profile_picture: event.target.files[0],
        };
      });
      //value = event.target.files[0]
    }

    setUserProfileData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    // setErrors((previousErrors) => {
    //   return {
    //     ...previousErrors,
    //     [name]: undefined,
    //   };
    // });
  };

  //Toast on profile update

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
            <img
              src={
                userProfileData.profile_picture
                  ? userProfileData.profile_picture
                  : userprofile
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {userProfileData.first_name} {userProfileData.middle_name}{" "}
                {userProfileData.last_name}{" "}
              </span>
              <span className="userShowCurrentWork">
                {userProfileData.current_work}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>

            <div className="userShowInfo">
              <MdPermIdentity className="userShowIcon" />
              <span className="userShowUserInfoTitle">{userProfileData.username}</span>
            </div>

            <div className="userShowInfo">
              <MdOutlineDateRange className="userShowIcon" />
              <span className="userShowUserInfoTitle">
                {userProfileData.birth_date}
              </span>
            </div>

            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MdPhoneIphone className="userShowIcon" />
              <span className="userShowUserInfoTitle">
                {userProfileData.phone_no}
              </span>
            </div>

            <div className="userShowInfo">
              <FaAddressCard className="userShowIcon" />
              <span className="userShowUserInfoTitle">
                {userProfileData.address_line_1} | {userProfileData.city} |{" "}
                {userProfileData.state}
              </span>
            </div>

            <span className="userShowTitle">Achievements</span>

            <div className="userShowInfo">
              <GiAchievement className="userShowIcon" />
              <span className="userShowUserInfoTitle">
                {userProfileData.achievements}
              </span>
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
                  className="userUpdateInput"
                  value={userProfileData.first_name}
                  onChange={onInputChange}
                  name="first_name"
                />
              </div>

              <div className="userUpdateItem">
                <label>Middlename: </label>
                <input
                  type="text"
                  className="userUpdateInput"
                  value={userProfileData.middle_name}
                  onChange={onInputChange}
                  name="middle_name"
                />
              </div>

              <div className="userUpdateItem">
                <label>Lastname: </label>
                <input
                  type="text"
                  className="userUpdateInput"
                  value={userProfileData.last_name}
                  onChange={onInputChange}
                  name="last_name"
                />
              </div>

              <div className="userUpdateItem">
                <label>Maidenname: </label>
                <input
                  type="text"
                  className="userUpdateInput"
                  value={userProfileData.maiden_name}
                  onChange={onInputChange}
                  name="maiden_name"
                />
              </div>

              <div className="userUpdateItem">
                <label>Birthdate: </label>
                <input
                  type="date"
                  className="userUpdateInput"
                  value={userProfileData.birth_date}
                  onChange={onInputChange}
                  name="birth_date"
                />
              </div>

              <div className="userUpdateItem">
                <label>Phone No: </label>
                <input
                  type="text"
                  className="userUpdateInput"
                  value={userProfileData.phone_no}
                  onChange={onInputChange}
                  name="phone_no"
                />
              </div>

              <div className="userUpdateItem">
                <label>Address Line 1: </label>
                <input
                  type="text"
                  className="userUpdateInput"
                  value={userProfileData.address_line_1}
                  onChange={onInputChange}
                  name="address_line_1"
                />
              </div>

              <div className="userUpdateItem">
                <label>City: </label>
                <input
                  type="text"
                  className="userUpdateInput"
                  value={userProfileData.city}
                  onChange={onInputChange}
                  name="city"
                />
              </div>

              <div className="userUpdateItem">
                <label>State: </label>
                <input
                  type="text"
                  className="userUpdateInput"
                  value={userProfileData.state}
                  onChange={onInputChange}
                  name="state"
                />
              </div>

              <div className="userUpdateItem">
                <label>Current Work: </label>
                <input
                  type="textarea"
                  className="userUpdateInput"
                  value={userProfileData.current_work}
                  onChange={onInputChange}
                  name="current_work"
                />
              </div>

              <div className="userUpdateItem">
                <label>Achievements: </label>
                <input
                  type="textarea"
                  className="userUpdateInput"
                  value={userProfileData.achievements}
                  onChange={onInputChange}
                  name="achievements"
                />
              </div>
            </div>

            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={
                    userProfileData.profile_picture
                      ? userProfileData.profile_picture
                      : userprofile
                  }
                  alt=""
                />

                <label htmlFor="file">
                  <MdPublish size={20} className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={onInputChange}
                />
              </div>
              <Button
                variant="warning"
                className="userUpdateButton"
                onClick={handleOnClick}
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;

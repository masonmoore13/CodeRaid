import React, { useEffect, useState } from "react";
import "./userprofile.css";
import { data, userD } from "../../../dummyUserData";
import { Button, Form, Card, Modal, ModalBody } from "react-bootstrap";
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
import {
  updateUserProfileById,
  getUserProfileById,
  getRelationshipByUserId,
  profileIdFilter,
} from "../../../api/apiCalls";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Userprofile = () => {
  let { user, userProfile } = useSelector((state) => state.user.user);

  const [preview, setPreview] = useState("");

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
    profile_picture: null,
  });

  let { id } = useParams();

  useEffect(() => {
    if (!id) {
      id = userProfile.id;
    }

    if (id) {
      getUserProfileById(id).then((res) => {
        setUserProfileData(res.data);
      });
    }
  }, [userProfile]);

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
      userId = userProfile.id;
    } else {
      userId = id;
    }

    let formField = new FormData();
    for (var key in userProfileData) {
      if (userProfileData[key] != null) {
        if (
          key === "profile_picture" &&
          !(userProfileData[key] instanceof File)
        ) {
          console.log(userProfileData[key]);
          console.log("skipped");
          continue;
        }

        formField.append(key, userProfileData[key]);
      }
    }

    updateUserProfileById(formField, userId)
      .then((res) => {
        // notify();
        console.log(res);
        window.location.reload();
        notify();
        // if (!id) {
        //   navigate("/dashboard/home");
        // } else {
        //   navigate(`/dashboard/userprofile/${id}/`);
        // }

        //window.reload();
      })
      .catch((error) => {});
  };

  const onInputChange = (event) => {
    const { value, name, files } = event.target;

    console.log(files + " " + name);

    if (files) {
      setUserProfileData((prevState) => {
        return {
          ...prevState,
          profile_picture: files[0],
        };
      });
      const objectUrl = URL.createObjectURL(files[0]);
      setPreview(objectUrl);
      return;
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

  // Relationship fetch
  
  const [relationship, setRelationship] = useState([]);
  const [user2Info, setUser2Info] = useState([]);
  useEffect(() => {
    getRelationshipByUserId(id).then((response) => {
      setRelationship(response.data);
    });
  }, []);

  useEffect(() => { 
    profileIdFilter(relationship.user2).then((response) => {
      // 7 should be relationship.user2
      setUser2Info(response.data);
    });
  }, [relationship]);

  // Relationship Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit</h1>
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
              alt="Profile pic"
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {userProfileData.first_name ? userProfileData.first_name : ""}{" "}
                {userProfileData.middle_name}
                {userProfileData.last_name}
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
              <span className="userShowUserInfoTitle">{user.username}</span>
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
                <label>GradYear: </label>
                <input
                  type="text"
                  className="userUpdateInput"
                  value={userProfileData.grad_year}
                  onChange={onInputChange}
                  name="grad_year"
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
                {preview.length ? (
                  <img
                    className="userUpdateImg"
                    src={preview}
                    alt="Profile pic"
                  />
                ) : (
                  <img
                    className="userUpdateImg"
                    src={
                      userProfileData.profile_picture
                        ? userProfileData.profile_picture
                        : userprofile
                    }
                    alt="Profile pic"
                  />
                )}

                <label htmlFor="file">
                  <MdPublish size={20} className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  placeholder=""
                  className="form-control"
                  onChange={onInputChange}
                />
              </div>

              <Card className="relationshipsCard w-100 text-center d-inline-flex">
                <Card.Body>
                  <Card.Title className="header mx-auto">
                    Relationships
                  </Card.Title>
                  <hr />
                  {relationship.map((relationship, index) => (
                    <Card.Text className="namesRelationship">
                      {relationship.relationship_type}
                      {user2Info.map((user2Info, index) => (
                        <Card.Text className="name">
                          {user2Info.first_name} {user2Info.last_name}
                        </Card.Text>
                      ))}
                    </Card.Text>
                  ))}
                </Card.Body>

                <Button variant="success w-50 mx-auto" onClick={handleShow}>
                  Add Relationship
                </Button>
                <Modal
                  show={show}
                  onHide={handleClose}
                  centered
                  size="lg"
                  className="text-center"
                >
                  <Modal.Header closeButton>
                    <Modal.Title className="modal-header ">
                      Choose a user and select type of relationship
                    </Modal.Title>
                  </Modal.Header>
                  <ModalBody>Herro</ModalBody>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="success">Add Relationship</Button>
                  </Modal.Footer>
                </Modal>
              </Card>

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

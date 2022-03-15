import React, { useEffect, useState, useCallback } from "react";
import "./userprofile.css";
import { data, userD } from "../../../dummyUserData";
import { Button, Form, Card, Modal} from "react-bootstrap";
import userprofile from "../../../Assets/images/userprofile.png";
import {
  MdPermIdentity,
  MdOutlineDateRange,
  MdPhoneIphone,
  MdPublish,
} from "react-icons/md";
import Spinner from "react-bootstrap/Spinner";
import { FaAddressCard, FaTrash } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { useSelector } from "react-redux";
import { IconContext } from "react-icons";
import {
  updateUserProfileById,
  getUserProfileById,
  createRelationship,
  deleteRelationshipById,
} from "../../../api/apiCalls";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";


toast.configure();

const Userprofile = () => {
  let { user, userProfile } = useSelector((state) => state.user.user);
  let navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

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

  // The toast displays and page refresh after 1 second
  const notify = () => {
    toast.warn("Your profile has been updated!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });setTimeout(function () {
      window.location.reload();
    }, 1300);
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

  if (!userProfile) {
    userProfile = data;
    user = userD;
  }

  // Relationship Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Relationship fetch
  const [relationship, setRelationship] = useState([]);
  const [relationship_type, setRelationshipType] = useState("Friend");
  const [user2, setUser2] = useState("");

  useEffect(() => {
    if (!id) {
      id = userProfile.id;
    }
    if (id) {
      getUserProfileById(id).then((res) => {
        setUserProfileData(res.data);
        setRelationship(res.data.relationships);
      });
    }
  }, [id, userProfile]);

  //Create Relationship
  const createRelationshipInfo = async () => {
    let formField = new FormData();

    formField.append("user", userProfile.id);
    formField.append("relationship_type", relationship_type);
    formField.append("user2", user2);
    createRelationship(formField).then((response) => {
      console.log(response.data);
      navigate.push("/");
    });
  };

 //TypeAhead component
 const CACHE = {};
 const PER_PAGE = 50;
 const SEARCH_URI = "http://127.0.0.1:8000/accounts/profile/user/?search=";

 function makeAndHandleRequest(query, page = 1) {
   return fetch(`${SEARCH_URI}${query}`)
     .then((resp) => resp.json())
     .then((user) => {
       const options = user.map((user) => ({
         first_name: user.first_name,
         last_name: user.last_name,
         id: user.id,
       }));
       return { options };
     });
 }

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");

  const handleInputChange = (q) => {
    setQuery(q);
  };

  const handlePagination = (e, shownResults) => {
    const cachedQuery = CACHE[query];

    // Don't make another request if:
    // - the cached results exceed the shown results
    // - we've already fetched all possible results
    if (
      cachedQuery.options.length > shownResults ||
      cachedQuery.options.length === cachedQuery.total_count
    ) {
      return;
    }

    setIsLoading(true);
    const page = cachedQuery.page + 1;

    makeAndHandleRequest(query, page).then((resp) => {
      const options = cachedQuery.options.concat(resp.options);
      CACHE[query] = { ...cachedQuery, options, page };
      setIsLoading(false);
      setOptions(options);
    });
  };

  // `handleInputChange` updates state and triggers a re-render, so
  // use `useCallback` to prevent the debounced search handler from
  // being cancelled.
  const handleSearch = useCallback((q) => {
    if (CACHE[q]) {
      setOptions(CACHE[q].options);
      return;
    }

    setIsLoading(true);
    makeAndHandleRequest(q).then((resp) => {
      CACHE[q] = { ...resp, page: 1 };

      setIsLoading(false);
      setOptions(resp.options);
    });
  }, []);


  return (
    <div className={`user ${showSpinner ? "blur" : ""}`}>
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
              {showSpinner && (
                <Spinner style={{ zIndex: "10000" }} animation="border" />
              )}
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

              <Card className="relationshipsCard w-100 text-center">
                <Card.Body>
                  <Card.Title className="header mx-auto">
                    Friends & Family
                  </Card.Title>
                  <hr />
                  {relationship.map((relationship, index) => (
                    <Card.Text className="text-start ms-3">
                      {relationship.relationship_type + ": "}
                      <button
                        className="btn-sm btn-warning ms-1"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowSpinner(true);

                          setTimeout(() => {
                            setShowSpinner(false);
                            navigate(
                              "/dashboard/userprofile/" +
                                relationship.user2 +
                                "/"
                            );
                          }, 500);
                        }}
                      >
                        <span>{relationship.relationship_name}</span>
                      </button>
                    </Card.Text>
                  ))}
                </Card.Body>

                <Button
                  variant="btn btn-warning border-0 w-25 mx-auto"
                  onClick={handleShow}
                >
                  Add/Edit
                </Button>
                <Modal
                  show={show}
                  onHide={handleClose}
                  centered
                  size="xl"
                  className="text-center"
                >
                  <Modal.Header closeButton>
                    <Modal.Title className="m-2 ">
                      Choose a member and select type of relationship
                    </Modal.Title>
                  </Modal.Header>

                  <div className="container m-3">
                    <div class="row">
                      <div class="col ">
                        <h6>Select A Member</h6>

                        <div className="row display-6 mx-auto">
                          <AsyncTypeahead
                            isLoading={isLoading}
                            labelKey={(option) =>
                              `${option.first_name} ${option.last_name}`
                            }
                            maxResults={PER_PAGE - 1}
                            minLength={1}
                            onInputChange={handleInputChange}
                            onPaginate={handlePagination}
                            onSearch={handleSearch}
                            options={options}
                            paginate
                            placeholder="Search for a user..."
                            renderMenuItemChildren={(option) => (
                              setUser2(option.id),
                              (
                                <div key={option.id}>
                                  <span>
                                    {option.first_name} {option.last_name}
                                  </span>
                                </div>
                              )
                            )}
                            useCache={false}
                          />
                        </div>
                      </div>
                      <div class="col ">
                        <h6 className="">Select Relationship Type</h6>
                        <form>
                          <select
                            className="form-select"
                            value={relationship_type}
                            onChange={(e) =>
                              setRelationshipType(e.target.value)
                            }
                          >
                            <option selected>Friend</option>
                            <option>Spouse</option>
                            <option>Parent</option>
                            <option>Child</option>
                            <option>Sibling</option>
                            <option>Relative</option>
                          </select>
                        </form>
                      </div>
                    </div>
                  </div>

                  <Modal.Footer className="justify-content-between">
                    <div className="text-start ">
                      {relationship.map((relationship, index) => (
                        <h6>
                          {relationship.relationship_type +
                            ": " +
                            relationship.relationship_name}
                          <IconContext.Provider
                            value={{ color: "red", size: "25px" }}
                          >
                            <Button
                              className="button bg-white border-0"
                              type="button"
                              onClick={() => (
                                deleteRelationshipById(relationship.id), window.location.reload()
                              )}
                             
                            >
                              <FaTrash />
                            </Button>
                          </IconContext.Provider>
                        </h6>
                      ))}
                    </div>
                    <div>
                      <Button
                        variant="secondary btn-outline-dark m-1"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                      <Button
                        variant="btn btn-warning btn-outline-dark"
                        onClick={() => {
<<<<<<< HEAD
                         notify();
                         createRelationshipInfo();
=======
                          createRelationshipInfo();
                          /*reload or go back to profile*/
>>>>>>> parent of 387cca8 (fixed vulnerabilities)
                        }}
                      >
                        Add Relationship
                      </Button>
                    </div>
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

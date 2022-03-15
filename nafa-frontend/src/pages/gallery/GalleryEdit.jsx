import React, { useState, useEffect } from "react";
import {
  getHomeGallery,
  deleteHomeGalleryById,
  createHomeGalleryImage,
} from "../../api/apiCalls";
import ModalImage from "react-modal-image";
import { Button, Modal, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useParams, Link, useNavigate } from "react-router-dom";

const GalleryEdit = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    getHomeGallery().then((response) => {
      setGallery(response.data);
    });
  }, []);

  let navigate = useNavigate();
  const [home_gallery_image, setImages] = useState(false);

   const CreateGalleryInfo = async () => {
     let formField = new FormData();

     if (home_gallery_image !== null) {
       formField.append("home_gallery_image", home_gallery_image);
     }

     createHomeGalleryImage(formField).then((response) => {
       console.log(response.data);
       navigate.push("/");
     });
   };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
    <div>
      <Button
        variant="btn btn-warning text-center mx-auto"
        style={{ width: "10%" }}
        onClick={handleShow}
      >
        Add/Edit
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="sn"
        className="text-center"
      >
        <Modal.Header closeButton>
          <Modal.Title className="m-2 text-center mx-auto">
            Add images
            <input
              type="file"
              placeholder=""
              to={`/dashboard/galleryEdit`}
              className="form-control"
              onChange={(e) => setImages(e.target.files[0])}
            />
          </Modal.Title>
        </Modal.Header>
        <Link
          className="btn  btn-warning m-1 w-25 mx-auto"
          to={`/dashboard/galleryEdit`}
          onClick={() => {
            CreateGalleryInfo();
            handleClose();
            window.reload();
          }}
        >
          Add Image
        </Link>
      </Modal>
      <div className="row d-flex flex-row text-center">
        {gallery.map((gallery, index) => (
          <div
            className="col-3 d-flex rounded flex-column "
            key={gallery.home_gallery_image}
          >
            <ModalImage
              className="d-flex flex-column rounded p-1 mx-auto"
              small={gallery.home_gallery_image}
              large={gallery.home_gallery_image}
            />

            <IconContext.Provider value={{ color: "red", size: "25px" }}>
              <Button
                className="btn bg-transparent border-0"
                onClick={() => (
                  deleteHomeGalleryById(gallery.id), window.location.reload()
                )}
              >
                <FaTrash />
              </Button>
            </IconContext.Provider>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryEdit;

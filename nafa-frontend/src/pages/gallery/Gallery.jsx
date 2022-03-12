import React, { useState, useEffect } from "react";
import { getGallery } from "../../api/apiCalls";
import ModalImage from "react-modal-image";
import { Button } from "react-bootstrap";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    getGallery()
      .then((response) => {
        console.log(response.data);
        setGallery(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="row m-1 d-flex flex-row text-center">
      <h1>Gallery</h1><hr/>
      {gallery.map((gallery, index) => (
        <div
          className="col-4 d-flex flex-column mx-auto"
          key={gallery.home_gallery_image}
        >
          <ModalImage
            className="d-flex flex-column rounded p-1 mx-auto"
            height="500px"
            small={gallery.home_gallery_image}
            large={gallery.home_gallery_image}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;

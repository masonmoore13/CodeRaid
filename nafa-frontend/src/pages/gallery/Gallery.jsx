import React, { useState, useEffect } from "react";
import { getHomeGallery } from "../../api/apiCalls";
import ModalImage from "react-modal-image";
import { Button } from "react-bootstrap";
import "./Gallery.css";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    getHomeGallery()
      .then((response) => {
        console.log(response.data);
        setGallery(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="row m-1 mb-2 d-flex flex-row text-center">
      <h1>Gallery</h1>
      {gallery.map((gallery, index) => (
        <div
          className="col-4 mb-2 d-flex rounded flex-column mx-auto"
          key={gallery.home_gallery_image}
        >
          <ModalImage
            className="container d-flex flex-column rounded p-1 mx-auto"
            small={gallery.home_gallery_image}
            large={gallery.home_gallery_image}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;

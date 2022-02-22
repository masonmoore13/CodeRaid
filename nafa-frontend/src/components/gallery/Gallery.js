import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import "./gallery.css"
import image1 from "../../Assets/images/i8.jfif";
import image2 from "../../Assets/images/720s.jfif";
import image3 from "../../Assets/images/camo lamb.jfif";

function Gallery() {
    return (
        <div className="Carousel">
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="home-images"
                        src={image1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        {/* THIS IS OPTIONAL
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="home-images"
                        src={image2}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        {/* THIS IS OPTIONAL 
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="home-images"
                        src={image3}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        {/* THIS IS OPTIONAL 
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Gallery;
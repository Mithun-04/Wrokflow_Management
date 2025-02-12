import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CustomArrow = ({ style, onClick, direction }) => (
  <div
    style={{
      ...style,
      position: "absolute",
      top: "-80px",
      right: direction === "left" ? "90px" : "30px",
      background: "#525252",
      color: "#EBF4F6",
      borderRadius: "50%",
      padding: "12px",
      fontSize: "20px",
      cursor: "pointer",
      zIndex: 10,
    }}
    onClick={onClick}
  >
    {direction === "left" ? "<" : ">"}
  </div>
);

const boxStyle = {
  backgroundColor: "#313131",
  width: "280px",
  height: "250px",
  padding: "20px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-start",
  position: "relative",
  transition: "all 0.3s ease",
};

const bottomLeftStyle = {
  position: "absolute",
  bottom: "20px",
  left: "40px",
  color: "#EBF4F6",
};

const textStyle = {
  fontSize: "30px",
  fontWeight: 550,
};

const nameStyle = {
  fontSize: "35px",
  fontWeight: 780,
  marginTop: "15px",
};

const labelStyle = { //user_creator
  position: "absolute",
  top: "0px",
  left: "0px",
  backgroundColor: "#525252",
  color: "#EBF4F6",
  padding: "10px 20px",//height and width
  borderRadius: "4px",
  fontSize: "16px",
  fontWeight: 200,
};

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "210px",
    centerMode: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
  };

  const blocks = [1, 2, 3, 4, 5];
  const content = ["user", "creator", "user", "user", "creator"];
  const names = ["ABCD", "EFGH", "IJKL", "MNOP", "QRST"];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#EBF4F6",
      }}
    >
      <div style={{ width: "60%", position: "relative" }}>
        <Slider {...settings}>
          {blocks.map((number, index) => (
            <div key={index} style={{ padding: "10px" }}>
              <div
                style={{
                  ...boxStyle,
                  filter: index === currentSlide ? "none" : "blur(0.35px)",
                  opacity: index === currentSlide ? 1 : 0.9,
                }}
              >
                <div style={labelStyle}>{content[index]}</div>
                <div style={bottomLeftStyle}>
                  <span style={textStyle}>Project {number}</span>
                  <br />
                  <span style={nameStyle}>{names[index]}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;

import React from "react";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "/slider1.png" },
  { url: "/svgviewer-png-output.png" },
  { url: "/slider1.jpg" },
];

const Slider = () => {
  return (
    <div>
      <SimpleImageSlider
        width={"100%"}
        height={350}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
}

export default Slider



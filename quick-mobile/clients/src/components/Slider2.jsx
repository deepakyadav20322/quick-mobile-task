import React from "react";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "/svgviewer-png-output2.png" },
  { url: "/svgviewer-png-output.png" },
  { url: "/svgviewer-png-output (1).png" },
];

const Slider2 = () => {
  return (
    <div className="">
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

export default Slider2



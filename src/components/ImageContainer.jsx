import img1 from "../assets/Img/Signin/Image1.png";
import img2 from "../assets/Img/Signin/Image2.png";
import img3 from "../assets/Img/Signin/Image3.png";
import img4 from "../assets/Img/Signin/Image4.png";
import img5 from "../assets/Img/Signin/Image5.png";
import img6 from "../assets/Img/Signin/Image6.png";
import img7 from "../assets/Img/Signin/Image7.png";
import img8 from "../assets/Img/Signin/Image8.png";
import img9 from "../assets/Img/Signin/Image9.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const ImageContainer = () => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-3 gap-0">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`image-${index}`}
          className="w-full h-[300px] object-fill"
        />
      ))}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`image-${index}`}
          className="w-full h-auto object-cover"
        />
      ))}
    </div>
  );
};

export default ImageContainer;

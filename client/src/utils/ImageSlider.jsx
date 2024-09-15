import {
  registration1,
  registration2,
  registration3,
} from "../data/fileImports";

function ImageSlider() {
  return (
    <div className="relative h-screen w-full overflow-hidden rounded-[4px]">
      <img
        src={registration1}
        alt="Animated Content 1"
        className="image-animation image1 h-full w-full object-cover"
        loading="lazy"
      />
      <img
        src={registration2}
        alt="Animated Content 2"
        className="image-animation image2 h-full w-full object-cover"
        loading="lazy"
      />
      <img
        src={registration3}
        alt="Animated Content 3"
        className="image-animation image3 h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

export default ImageSlider;

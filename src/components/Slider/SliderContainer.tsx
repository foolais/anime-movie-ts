import { ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SliderProps extends React.ComponentProps<typeof Slider> {
  children: ReactNode;
}

const SliderContainer = ({ children, ...rest }: SliderProps) => {
  return (
    <div className="slider-container">
      <Slider {...rest}>{children}</Slider>
    </div>
  );
};

export default SliderContainer;

import React from 'react';
import Slider from 'react-slick';

export const RSlider = ({ children, className, ...config }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'blue', marginLeft: '10%', zIndex: 4 }}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          background: 'blue',
          marginRight: '10%',
          zIndex: 4,
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <Slider {...settings} {...config} className={className}>
      {children}
    </Slider>
  );
};

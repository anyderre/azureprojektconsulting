import React from 'react';
import { ScrollingCarousel, Carousel as SimpleCarousel } from '@trendyol-js/react-carousel';

export const Carousel = ({
  type = 'SIMPLE',
  show = 3.5,
  swiping = true,
  slide = 3,
  children,
  dynamic = true,
  config,
}) => {
  const Simple = () => {
    return (
      <SimpleCarousel show={show} slide={swiping} dynamic={dynamic} swiping={slide} {...config}>
        {children}
      </SimpleCarousel>
    );
  };
  const Scrolling = () => {
    return (
      <ScrollingCarousel show={show} slide={swiping} swiping={slide} {...config}>
        {children}
      </ScrollingCarousel>
    );
  };
  return (
    <>
      {type === 'SIMPLE' && <Simple />}

      {type === 'SCROLLING' && <Scrolling />}
    </>
  );
};

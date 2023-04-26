import React from 'react';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';

export const Carousel = ({ show = 3.5, swiping = true, slide = 3, children }) => {
  return (
    <ScrollingCarousel show={show} slide={swiping} swiping={slide}>
      {children}
    </ScrollingCarousel>
  );
};

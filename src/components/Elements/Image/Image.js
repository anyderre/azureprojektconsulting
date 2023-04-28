import React from 'react';
import imageError from '@/assets/errorImage.png';

export const Image = ({ src, alt, className, children }) => {
  function handleImageError(ev) {
    ev.target.src = imageError;
  }

  return (
    <>
      <img className={className} alt={alt} src={src} onError={handleImageError} />
      {children}
    </>
  );
};

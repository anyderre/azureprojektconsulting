import React from 'react';
import Skeleton_Component, { SkeletonTheme } from 'react-loading-skeleton';

export const Skeleton = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <p>
        <Skeleton_Component containerClassName="leading-1 inline" />
      </p>
    </SkeletonTheme>
  );
};

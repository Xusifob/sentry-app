import React,{ FC } from "react";
import cls from "classnames";


export type SkeletonProps = {
    size : 'small' | 'medium' | 'large';
    className?: string
}

const Skeleton : FC<SkeletonProps> = ({ size,className }) => {

  const sizes = {
    small: 'h-2.5',
    medium: 'h-5',
    large: 'h-10'
  };

  const height = sizes[size];

  return (
    <div className={cls('w-full animate-pulse bg-gray-200 rounded-full dark:bg-gray-500',height,className)}>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default Skeleton;

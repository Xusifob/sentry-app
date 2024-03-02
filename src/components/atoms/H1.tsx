import React, { FC, HTMLAttributes, ReactNode } from "react";
import cls from "classnames";


export type ColorType = 'primary' | 'success' | 'error' | 'warning' | 'gray';

export type H2Props = HTMLAttributes<HTMLElement> & {
    icon?: ReactNode,
    title?: string
};

const H1: FC<H2Props> = ({ children, icon, title, className }) => {

  return (<h1 className={cls('font-bold text-2xl text-gray-700 dark:text-gray-100', className)}>
    {(title || icon) && (<span className='flex flex-row items-center gap-2'>
      {icon}
      <span className='flex flex-row items-center gap-2'>{title}</span>
    </span>)}
    {children}
  </h1>);

};

export default H1;
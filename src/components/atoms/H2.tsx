import React, { FC, HTMLAttributes, ReactNode } from "react";
import cls from "classnames";


export type ColorType = 'primary' | 'success' | 'error' | 'warning' | 'gray';

export type H2Props = HTMLAttributes<HTMLElement> & {
    icon?: ReactNode,
    title?: string
};

const H2: FC<H2Props> = ({ children, icon, title, className }) => {

  return (<h2 className={cls('font-bold text-lg text-gray-700 dark:text-gray-100', className)}>
    {(title || icon) && (<span className='flex flex-row items-center gap-2'>
      {icon}
      <span className='flex flex-row items-center gap-2'>{title}</span>
    </span>)}
    {children}
  </h2>);

};

export default H2;
import React, { FC, HTMLAttributes } from "react";
import cls from "classnames";


export type H4Props = HTMLAttributes<HTMLElement>;

const H4: FC<H4Props> = ({ children,className }) => {

  return (<h4 className={cls('text-gray-700 dark:text-gray-100',className)}>
    {children}
  </h4>);

};

export default H4;
import React, { FC, HTMLAttributes } from "react";
import cls from "classnames";


export type PProps = HTMLAttributes<HTMLElement>;

const P: FC<PProps> = ({ children,className,...rest }) => {

  return (<p
    className={cls('text-gray-700 dark:text-gray-100 text-xs',className)}
    {...rest}
  >
    {children}
  </p>);

};

export default P;
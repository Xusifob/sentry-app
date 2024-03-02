import React, { FC, HTMLAttributes } from "react";
import cls from "classnames";


const Card: FC<HTMLAttributes<HTMLDivElement>> = ({ children,className,...rest }) => {

  return (<div
    {...rest}
    className={cls("flex flex-col flex-grow justify-between rounded bg-white dark:bg-gray-700",className)}>
    {children}
  </div>);
};


export default Card;
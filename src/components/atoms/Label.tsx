import React, { FC } from "react";
import cls from "classnames";


export type LabelProps = {
    text : string,
    className?: string
    htmlFor ?: string
}

const Label : FC<LabelProps> = ({ text,className, htmlFor }) => {

  return ( <label
    className={cls(className,'mb-2 block font-bold text-gray-700 dark:text-gray-200')}
    htmlFor={htmlFor}>
    {text}
  </label>);
};

export default Label;
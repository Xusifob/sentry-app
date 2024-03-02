import React, { FC, FormHTMLAttributes } from "react";
import cls from "classnames";


export type FormProps = FormHTMLAttributes<HTMLFormElement> & {
    label?: string,
    containerClassName?: string
}
const Form : FC<FormProps> = ({ children,className,...rest }) => {


  return <form
    className={cls('flex flex-col gap-4 p-4',className)}
    {...rest}>
    {children}
  </form>;

};

export default Form;
import React, { FC } from "react";
import cls from "classnames";
import Alert, { ColorType } from "@/components/atoms/Alert";

export type ToastProps = {
    className?: string;
    color: ColorType;
    //icon?: string;
    title?: string;
    //countdown?: number,
    onDismiss?: () => void;
};


const Toast: FC<ToastProps> = ({ className,onDismiss, title, ...rest }) => {

  return (<Alert
    {...rest}
    className={cls('inline-flex mb-2 p-2', className)}
    title={title}
    onDismiss={onDismiss}
  />);


};

export default Toast;

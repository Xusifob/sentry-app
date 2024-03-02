import React, { FC, ReactNode } from "react";
import cls from "classnames";
import { MdCheckCircleOutline, MdErrorOutline, MdInfo } from "react-icons/all";
import Button from "@/components/atoms/Button";

export type ColorType = 'success' | 'error' | 'info';

type AlertProps = {
    title?: string
    content?: string
    actions?: ReactNode
    color: ColorType;
    className?: string;
    onDismiss?: () => void;
}

const Alert: FC<AlertProps> = ({ content, onDismiss, actions, className, title, color }) => {

  const colors = {
    success: 'border-success-500 text-success-500 bg-success-100',
    error: 'border-error-500 text-error-500 bg-error-100',
    info: 'border-primary-500 text-primary-500 bg-primary-100'
  };

  const icons = {
    success: (<MdCheckCircleOutline />),
    error: (<MdErrorOutline />),
    info: (<MdInfo />),
  };

  return (<div className={cls(" border-t-4 relative rounded-b px-5 py-4 shadow-md", colors[color], className)}
    role='alert'>
    <div className='flex gap-4'>
      <div className='py-1'>
        {icons[color]}
      </div>
      <div className='flex w-full grow flex-row items-center justify-between gap-4'>
        <div>
          {title && (<p className='font-bold'>{title}</p>)}
          {content && (<p className='text-sm'>{content}</p>)}
        </div>
        {actions}
      </div>
    </div>
    {onDismiss && (
      <Button icon='close' className='absolute right-0 top-0'
        color='transparent' onClick={() => onDismiss()} />
    )}
  </div>);
};

export default Alert;
import React, { FC, ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import Label from "./Label";
import cls from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import Skeleton from "@/components/atoms/Skeleton";
import { FieldErrors } from "react-hook-form";
import { uniqid } from "@/utils/utils";
import P from "@/components/atoms/P";


export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label?: string,
    containerClassName?: string,
    errors?: FieldErrors,
    helpText?: string,
    loading?: boolean,
    name: string,
}

const CheckboxSkeleton: FC = () => {
  return (<div className='flex flex-row gap-2'>
    <Skeleton size='small' className='!w-[30px]' />
    <Skeleton size='small' className='!w-[150px]' />
  </div>);
};


const Checkbox: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
    ({
      label,
      loading = false,
      helpText,
      errors,
      name,
      containerClassName,
      id,
      className,
      ...rest
    }, ref
    ) => {

      if (!id) {
        id = uniqid();
      }


      if (loading) {
        return (<CheckboxSkeleton />);
      }

      return (<div className={cls(containerClassName, 'flex items-top flex-row gap-2')}>
        <input
          ref={ref}
          type='checkbox'
          className={cls(
            `form-checkbox h-5 w-5 mt-1 text-blue-600`,
            className,
            { '!border-error-500': !!errors?.[name] }
          )}
          id={id}
          name={name}
          {...rest}
        />
        <div className='flex flex-col' >
          {label && <Label className={helpText ? '!mb-1' : ''} text={label}
            htmlFor={id} />}
          {errors ? (<ErrorMessage className='text-xs font-semibold text-error-500' as='span'
            errors={errors}
            name={name} />) : ''}
          {helpText && (<P className='mb-2'>{helpText}</P>)}
        </div>
      </div>);


    };

export default React.forwardRef(Checkbox);
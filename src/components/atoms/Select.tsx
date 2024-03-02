import React, { FC, ForwardRefRenderFunction, SelectHTMLAttributes } from "react";
import Label from "./Label";
import cls from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import Skeleton from "@/components/atoms/Skeleton";
import { FieldErrors } from "react-hook-form";

export type OptionType = {
    label: string,
    value: string | number
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string,
    containerClassName?: string,
    errors?: FieldErrors,
    loading?: boolean,
    name: string,
    options: OptionType[]
}

type SelectSkeletonProps = {
    label?: string,
}

const InputSkeleton: FC<SelectSkeletonProps> = ({ label }) => {
  return (<div className='flex flex-col gap-2'>
    {label && (<Skeleton size='small' className='!w-[150px]' />)}
    <Skeleton size='medium' />
  </div>);
};


const Select: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> =
    ({
      label,
      loading = false,
      errors,
      name,
      containerClassName,
      placeholder,
      options,
      id,
      className,
      ...rest
    }, ref
    ) => {


      if (loading) {
        return <InputSkeleton label={label} />;
      }

      return (<div className={cls(containerClassName)}>
        {label && <Label text={label} htmlFor={id} />}
        <select
          ref={ref}
          className={cls(
            `appearance-none border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 
              rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none 
              focus:border-primary-500`,
            className,
            { '!border-error-500': !!errors?.[name] }
          )}
          name={name}
          {...rest}
        >
          {placeholder && <option value=''>{placeholder}</option>}
          {options.map(
            (option, index) =>
              <option key={index} value={option.value}>{option.label}</option>
          )}
        </select>
        {errors ? (<ErrorMessage className='text-xs font-semibold text-error-500' as='span'
          errors={errors}
          name={name} />) : ''}
      </div>);


    };

export default React.forwardRef(Select);
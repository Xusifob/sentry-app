import React, { FC, ForwardRefRenderFunction, InputHTMLAttributes, useState } from "react";
import Label from "./Label";
import cls from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import Skeleton from "@/components/atoms/Skeleton";
import { FieldErrors } from "react-hook-form";
import { getIconByName } from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";


export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string,
    containerClassName?: string,
    errors?: FieldErrors,
    loading?: boolean,
    fetching?: boolean,
    name: string,
}

type InputSkeletonProps = {
    label?: string,
}

const InputSkeleton: FC<InputSkeletonProps> = ({ label }) => {
  return (<div className='flex flex-col gap-2'>
    {label && (<Skeleton size='small' className='!w-[150px]' />)}
    <Skeleton size='medium' />
  </div>);
};


const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
    ({
      label,
      loading = false,
      errors,
      name,
      containerClassName,
      fetching,
      id,
      type : realType,
      className,
      ...rest
    }, ref
    ) => {

      const [type,setType] = useState(realType);



      if (loading && type !== 'hidden') {
        return <InputSkeleton label={label} />;
      }

      return (<div className={cls(containerClassName,'relative', { hidden: type === 'hidden' })}>
        {label && <Label text={label} htmlFor={id} />}
        <input
          ref={ref}
          className={cls(
            `appearance-none border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 
              rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none 
              focus:border-primary-500`,
            className,
            { '!border-error-500': !!errors?.[name] }
          )}
          type={type}
          name={name}
          {...rest}
        />
        {realType === "password" &&
            <Button
              type='button'
              color='transparent'
              onClick={() => setType(type === 'password' ? 'text' : 'password')}

              icon={type === 'password' ? 'eye' : 'eyeOff'}
              className='absolute bottom-1 right-2'

            />}
        {fetching && getIconByName('loading',{ spin: true, className: 'text-primary-500 absolute top-3 right-3' })}
        {errors ? (<ErrorMessage className='text-xs font-semibold text-error-500' as='span'
          errors={errors}
          name={`root.${name}`} />) : ''}
      </div>);


    };

export default React.forwardRef(Input);
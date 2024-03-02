import React, { FC, ForwardRefRenderFunction, TextareaHTMLAttributes } from "react";
import Label from "./Label";
import cls from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import Skeleton from "@/components/atoms/Skeleton";
import { FieldErrors } from "react-hook-form";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string,
    containerClassName?: string,
    errors?: FieldErrors,
    loading?: boolean,
    name: string,
}


type TextareaSkeletonProps = {
    label?: string,
}

const InputSkeleton: FC<TextareaSkeletonProps> = ({ label }) => {
  return (<div className='flex flex-col gap-2'>
    {label && (<Skeleton size='small' className='!w-[150px]' />)}
    <Skeleton size='large' />
  </div>);
};


const TextArea: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> =
    ({ label, name, loading = false, errors, containerClassName, id, className, ...rest }, ref) => {

      if (loading) {
        return <InputSkeleton label={label} />;
      }

      return (<div className={cls('mb-4', containerClassName)}>
        {label && <Label text={label} htmlFor={id} />}
        <textarea
          ref={ref}
          name={name}
          className={cls(
            `appearance-none border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700
             rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight
              focus:outline-none focus:border-primary-500`,
            className,
            { 'border-error-500': !!errors?.[name] }
          )}
          {...rest}
        ></textarea>
        {errors ? (<ErrorMessage className='text-xs text-error-500' as='span'
          errors={errors} name={name} />) : ''}
      </div>);


    };

export default React.forwardRef(TextArea);
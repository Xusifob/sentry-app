import React, { ButtonHTMLAttributes, ForwardRefRenderFunction } from "react";
import Loader from "@/components/atoms/Loader";

import cls from 'classnames';
import Skeleton from "@/components/atoms/Skeleton";
import { getIconByName, IconType } from "@/components/atoms/Icon";

export type ColorType = 'primary' | 'success' | 'black' | 'error' | 'white' | 'transparent';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean
    saving?: boolean
    color?: ColorType
    icon?: IconType
    outline?: boolean
    iconAfter?: boolean,
    invisible?: boolean
    vibrate?: boolean
}

type getButtonColorType = {
    color: ColorType,
    disabled?: boolean,
    outline?: boolean,
    invisible?: boolean
}

export const getTextColor : (options : getButtonColorType) => string =
    ({
      color,
      disabled = false,
      outline = false,
      invisible = false
    }): string => {
      const colors = {
        disabled: outline ? 'text-gray-300 cursor-not-allowed' : 'text-white cursor-not-allowed',
        transparent: 'text-gray-500',
        primary: outline ? 'text-primary-500' : 'text-white',
        black: outline ? 'text-gray-500' : 'text-white',
        error: outline ? 'text-error-500' : 'text-white',
        success: outline ? 'text-success-500' : 'text-white',
        white: outline ? 'text-white' : 'text-gray-500 dark:text-white'
      };


      if (disabled) {
        return colors.disabled;
      }

      if (invisible) {
        return colors.transparent;
      }

      return colors[color];

    };

export const getButtonColor : (options : getButtonColorType) => string =
    ({
      color,
      disabled = false,
      outline = false,
      invisible = false
    }): string => {

      const textColor = getTextColor({ color, disabled, outline, invisible });

      const colors = {
        invisible: '!p-0 items-center focus:bg-transparent bg-transparent',
        disabled: outline ? 'border bg-transparent border-gray-300'
          : 'bg-gray-300',
        transparent: 'border bg-transparent border-transparent !p-1 focus:bg-transparent active:bg-transparent',
        primary: outline ? 'border bg-transparent border-primary-500'
          : 'bg-primary-500 hover:bg-primary-700',
        black: outline ? 'border bg-transparent border-gray-700'
          : 'bg-gray-700 text-gray-700 hover:bg-gray-700',
        error: outline ? 'border bg-transparent border-error-500 '
          : 'bg-error-500 hover:bg-error-700 dark:bg-error-600 dark:hover:bg-error-500',
        success: outline ? 'border bg-transparent border-success-500'
          : 'bg-success-500 hover:bg-success-700',
        white: outline ? 'border bg-transparent border-white'
          : 'bg-white hover:bg-white-700 dark:bg-gray-700'
      };

      if (disabled) {
        return [textColor, colors.disabled].join(' ');
      }

      if (invisible) {
        return [textColor, colors.invisible].join(' ');
      }

      return [textColor, colors[color]].join(' ');

    };


const Button: ForwardRefRenderFunction<HTMLButtonElement,ButtonProps> =
    ({
      icon,
      children,
      outline = false,
      iconAfter = false,
      color = 'primary',
      invisible = false,
      saving,
      type = "submit",
      onClick,
      className,
      loading = false,
      vibrate = false,
      disabled = false,
      ...rest
    },ref) => {


      if (loading) {
        return <Skeleton className={className} size='large' />;
      }

      return (<button
        ref={ref}
        onClick={(event) => {
          onClick && vibrate && navigator.vibrate(20);
          onClick && onClick(event);
        }}
        className={cls(
          `text-center flex gap-2 justify-center items-center font-bold py-2 px-4 rounded 
      focus:outline-none focus:shadow-outline`,
          className,
          getButtonColor({ color, outline, disabled, invisible }),
        )}
        disabled={disabled}
        type={type}
        {...rest}
      >
        {saving && <Loader className='m-auto h-6 font-bold' />}
        {!saving && (<>
          {icon && (
            <>
              {children && iconAfter && (<span className='hidden sm:inline-block'>{children}</span>)}
              {getIconByName(icon, {
                className: getTextColor({ color, outline, disabled, invisible })
              })}
              {children && !iconAfter && (<span className='hidden sm:inline-block'>{children}</span>)}
            </>)}

          {!icon && (children)}

        </>)}
      </button>);


    };
export default React.forwardRef(Button);
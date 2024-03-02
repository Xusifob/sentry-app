import React, { FC, LinkHTMLAttributes } from "react";
import Loader from "@/components/atoms/Loader";

import cls from 'classnames';
import Skeleton from "@/components/atoms/Skeleton";
import { getIconByName } from "@/components/atoms/Icon";
import { ButtonProps, getButtonColor, getTextColor } from "@/components/atoms/Button";
import { Link } from "react-router-dom";

type ButtonLinkProps = Omit<ButtonProps,'onClick'|'disabled'|'vibrate'>
    & LinkHTMLAttributes<HTMLAnchorElement> & {
    to : string
}

const ButtonLink: FC<ButtonLinkProps> =
    ({
      icon,
      children,
      outline = false,
      color = 'primary',
      invisible = false,
      saving,
      type = "submit",
      className,
      loading = false,
      ...rest
    }) => {


      if (loading) {
        return <Skeleton className={className} size='large' />;
      }

      return (<Link
        className={cls(
          `text-center flex gap-2 justify-center items-center font-bold py-2 px-4 rounded 
      focus:outline-none focus:shadow-outline`,
          className,
          getButtonColor({ color, outline, invisible }),
        )}
        type={type}
        {...rest}
      >
        {saving && <Loader className='m-auto h-6 font-bold' />}
        {!saving && (<>
          {icon && (
            <>
              {getIconByName(icon, { className: getTextColor({ color, outline, invisible }) })}
              <span>{children}</span>
            </>)}

          {!icon && (children)}

        </>)}
      </Link>);


    };
export default ButtonLink;
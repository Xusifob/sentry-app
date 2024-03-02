import React, { FC, PropsWithChildren } from "react";

import { Link as BaseLink } from 'react-router-dom';
import cls from "classnames";

type LinkProps = PropsWithChildren & {
    href : string
    className?: string
    target?: '_blank' | '_self' | '_parent' | '_top'
}

const Link : FC<LinkProps> = ({ target,className = '_self', href, children }) => {

  return (
    <BaseLink
      target={target}
      className={cls(className,'inline-block align-baseline text-sm font-bold text-primary-500 hover:text-primary-800')}
      to={href}
    >
      {children}
    </BaseLink>
  );
};

export default Link;
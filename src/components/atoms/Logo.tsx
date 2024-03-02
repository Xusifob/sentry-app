import Image from "@/components/atoms/Image";
import logo from "@/components/templates/pages/logo.svg";
import logo_white from "@/components/templates/pages/logo_white.svg";
import React from "react";


const Logo = () => {

  return (<div className='flex justify-center px-12'>
    <Image src={logo} className='dark:hidden'
      alt='Logo' />
    <Image src={logo_white} className='hidden dark:block'
      alt='Logo' />
  </div>);

};

export default Logo;
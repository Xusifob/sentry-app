import React, { FC, HTMLAttributes } from "react";
import H1 from "@/components/atoms/H1";
import Button from "@/components/atoms/Button";
import { useNavigate } from "react-router-dom";


type LayoutProps = HTMLAttributes<HTMLDivElement> & {
    title : string
};
const Layout: FC<LayoutProps> = ({ children, title }) => {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <div className='flex w-full items-center justify-between border-b border-gray-200 p-4' >
        <p>Sentry Error Manager</p>
        <Button icon='logout'
          onClick={logout}
          color='black'
          outline={true} />
      </div>
      <div className='space-y-2'>
        <div className='px-4 pt-4'>
          <H1>{title}</H1>
        </div>
        <div className='px-4'>
          {children}
        </div>
      </div>
    </div>);

};

export default Layout;
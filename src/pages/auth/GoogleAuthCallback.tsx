import React, { FC, useEffect, } from "react";
import Link from "@/components/atoms/Link";
import Skeleton from "@/components/atoms/Skeleton";
import { useSearchParams } from "react-router-dom";
import { destroyTokens, LoginType, saveTokens } from "@/hooks/auth/useLogin";
import { saveMe } from "@/utils/getMe";
import useGetMeMutate from "@/hooks/auth/useGetMeMutate";
import OfflineLayout from "@/components/templates/OfflineLayout";
import Alert from "@/components/atoms/Alert";
import Logo from "@/components/atoms/Logo";
import useGetMutate from "@/hooks/base/useGetMutate";

const GoogleAuthCallback: FC = () => {

  const [queryParams] = useSearchParams();

  const { doGet: getMe, error } = useGetMeMutate();

  const code = queryParams.get('code') as string;
  const state = queryParams.get('state') as string;

  const redirect = () => {
    console.log('redirect');
  };

  const { doGet: doGetAuth } = useGetMutate<LoginType>('oauth2/google');


  // On load
  useEffect(() => {

    destroyTokens();

    doGetAuth({
      id: 'callback',
      queryParams: {
        code,
        state
      }
    }).then((data) => {
      saveTokens(data);
      getMe().then((me) => {
        saveMe(me.data);
        redirect();
      });
    });

  }, [code, state,getMe,redirect, doGetAuth]);

  return (
    <OfflineLayout>
      <Logo />
      {error && (<Alert color='error' content={error.message} />)}
      {!error && (<div className='flex flex-col gap-4'>
        <Skeleton size='large' />
        <Skeleton size='medium' />
        <Skeleton size='medium' />
      </div>)}

      <footer className='text-center text-sm'>
        <p>
                    By proceeding, you agree to our
          <Link className='ml-1 underline' target='_blank'
            href='/privacy'>
                        Privacy Policy
          </Link>
                    .
        </p>
      </footer>

    </OfflineLayout>
  );
};
export default GoogleAuthCallback;
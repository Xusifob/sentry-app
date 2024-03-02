import React, { FC, useEffect } from "react";
import ErrorCard from "@/components/molecules/ErrorCard";
import useGetPaginatedCollection from "@/hooks/base/useGetPaginatedCollection";
import SentryError from "@/schemas/SentryError";
import P from "@/components/atoms/P";
import { getEnv } from "@/utils/importMeta";
import useStoredMe from "@/hooks/auth/useStoredMe";


type ErrorListProps = {
    archived: boolean;
}


const NoErrorFound = () => {

  const me = useStoredMe();

  return (<div>

    {me && (<p className='py-4' >In order to enable your errors, please add this as your Sentry webhook&nbsp;:<br />
      <strong className='text-sm'>{`${getEnv('VITE_API_URL')}sentry/users/${me.attributes._id}/webhooks`}</strong>
    </p>)}

  </div>);

};

const ErrorList: FC<ErrorListProps> = ({ archived }) => {

  const { data, isLoading ,setQueryParams } = useGetPaginatedCollection<SentryError>('sentry_exceptions', {
    archived
  });

  useEffect(() => {
    setQueryParams({ archived });
  }, [setQueryParams,archived]);


  return (<div className='flex flex-col gap-4'>
    {!data?.length && (<div className='p-4' >
      {isLoading && (<P>Loading...</P>)}
      {!isLoading && !data.length && (<NoErrorFound />)}
    </div>)}
    {data.map((error) => (<ErrorCard error={error} key={error.id} />))}
  </div>);

};

export default ErrorList;
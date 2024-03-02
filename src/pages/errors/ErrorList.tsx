import React, { FC, useEffect } from "react";
import ErrorCard from "@/components/molecules/ErrorCard";
import useGetPaginatedCollection from "@/hooks/base/useGetPaginatedCollection";
import SentryError from "@/schemas/SentryError";
import P from "@/components/atoms/P";
import { getEnv } from "@/utils/importMeta";
import useStoredMe from "@/hooks/auth/useStoredMe";
import Button from "@/components/atoms/Button";
import useToast from "@/hooks/ui/useToast";


type ErrorListProps = {
    archived: boolean;
}


const NoErrorFound = () => {

  const me = useStoredMe();

  const { addToast } = useToast();

  const link = `${getEnv('VITE_API_URL')}sentry/users/${me?.attributes._id}/webhooks`;

  const onCopy = () => {
    navigator.clipboard.writeText(link);


    addToast('info','The link has been copied to your clipboard');
  };

  return (<div className='mx-auto rounded-lg bg-white p-6 shadow-md xl:mx-0'>
    <h2 className='mb-4 text-lg font-semibold'>How to Enable Webhooks on Sentry</h2>
    <ol className='list-inside list-decimal space-y-2'>
      <li>Log in to your Sentry account.</li>
      <li>Navigate to the settings page for your project.</li>
      <li>Click on &#39;Integrations&#39;.</li>
      <li>Find the &#39;Webhooks&#39; integration and click &#39;Configure&#39;.</li>
      <li>In the &#39;Webhooks&#39; settings, paste the following URL into the &#39;Callback URLs&#39; field:</li>
    </ol>
    <div className='mt-4 flex items-center rounded bg-gray-100 p-4'>
      <input
        className='flex-1 bg-transparent text-sm outline-none'
        readOnly
        type='text'
        value={link}
      />
      <Button onClick={onCopy} className='ml-2'
        color='black' outline={true}>
        Copy link
      </Button>
    </div>
    <div className='mt-4'>
      <p>After pasting the URL, make sure to save your changes.</p>
    </div>
  </div>);

};

const ErrorList: FC<ErrorListProps> = ({ archived }) => {

  const { data, isLoading, setQueryParams } = useGetPaginatedCollection<SentryError>('sentry_exceptions', {
    archived
  });

  useEffect(() => {
    setQueryParams({ archived });
  }, [setQueryParams, archived]);


  return (<div className='flex flex-col gap-4'>
    {!data?.length && (<div className='p-4'>
      {isLoading && (<P>Loading...</P>)}
      {!isLoading && !data.length && (<NoErrorFound />)}
    </div>)}
    {data.map((error) => (<ErrorCard error={error} key={error.id} />))}
  </div>);

};

export default ErrorList;
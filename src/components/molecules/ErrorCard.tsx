import React, { FC, useState } from 'react';
import { getIconByName } from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import Link from "@/components/atoms/Link";
import SentryError from "@/schemas/SentryError";
import useUpdate from "@/hooks/base/useUpdate";
import useDelete from "@/hooks/base/useDelete";

type ErrorCardProps = {
  error : SentryError,
  onUpdate : (item : SentryError) => void
}

const displayDate = (date : string) : string => {


  const d = new Date(date);

  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();

};

const ErrorCard : FC<ErrorCardProps> = ({ error,onUpdate }) => {

  const [open,setOpen] = useState(false);

  const { update, isLoading : isUpdating, } = useUpdate('sentry_exceptions');

  const { doDelete,isLoading : isDeleting } = useDelete('sentry_exceptions');


  return (<div className='rounded-lg border shadow-sm'>
    <div className='flex flex-col space-y-2 p-4'>
      <div className='flex items-center space-x-2' >
        <button className='flex items-start space-x-2' onClick={() => setOpen((prevState) => !prevState)} >
          {getIconByName(open ? 'chevronDown' : 'chevronRight')}
          <span className='text-left text-sm font-medium leading-none sm:truncate'>
            {error.attributes.title}
          </span>
        </button>
        <div className='flex space-x-2'>
          <Button
            type='button'
            onClick={async () => {
              await update( {
                id : error.attributes._id,
                archived: !error.attributes.archived
              },{
              });

              onUpdate(error);
            }}
            disabled={isDeleting}
            loading={isUpdating}
            color='primary'
            icon={error.attributes.archived ? 'unarchive' : 'archive' }
          />
          <Button
            onClick={async () => {
              await doDelete(error.attributes._id);
              onUpdate(error);

            }}
            loading={isDeleting}
            disabled={isUpdating}
            outline={true}
            color='black'
            icon='delete'
          />
        </div>
      </div>
      <div className='flex items-start space-x-2 text-xs text-gray-500 dark:text-gray-400'>
        {getIconByName('calendar')}
        <time>{displayDate(error.attributes.createdDate)}</time>
      </div>
      <div className='text-xs text-gray-500 dark:text-gray-400'>{error.attributes.location}</div>
      <div className='text-xs text-gray-500 dark:text-gray-400'>
        {error.attributes.message}
      </div>

      <Link href={error.attributes.url} target='_blank' >See on Sentry</Link>
    </div>
    {open && <div className='p-4' >
      <div className='prose max-w-none overflow-auto bg-primary-900 p-6 text-white'>
        <pre>
          {JSON.stringify(error.attributes.exception,null,2)}
        </pre>
      </div>
    </div>}
  </div>
  );
};

export default ErrorCard;
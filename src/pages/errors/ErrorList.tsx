import React, { FC, useEffect } from "react";
import ErrorCard from "@/components/molecules/ErrorCard";
import useGetPaginatedCollection from "@/hooks/base/useGetPaginatedCollection";
import SentryError from "@/schemas/SentryError";
import BaseSkeleton from "@/components/atoms/Skeleton";
import { getEnv } from "@/utils/importMeta";
import useStoredMe from "@/hooks/auth/useStoredMe";
import Button from "@/components/atoms/Button";
import useToast from "@/hooks/ui/useToast";
import { useTranslation } from "react-i18next";


type ErrorListProps = {
    archived: boolean;
}

const Skeleton = () => {

  return (<div className='flex flex-col gap-4' >
    <BaseSkeleton size='large' />
    <BaseSkeleton size='large' />
    <BaseSkeleton size='large' />
    <BaseSkeleton size='large' />
    <BaseSkeleton size='large' />
  </div>);

};

const NoErrorFound = () => {
  const { t } = useTranslation('translation');
  const me = useStoredMe();
  const { addToast } = useToast();
  const link = `${getEnv('VITE_API_URL')}sentry/users/${me?.attributes._id}/webhooks`;

  const onCopy = () => {
    navigator.clipboard.writeText(link);
    addToast('info', t('linkCopied'));
  };

  return (
    <div className='mx-auto rounded-lg bg-white p-6 shadow-md xl:mx-0'>
      <h2 className='mb-4 text-lg font-semibold'>{t('enableWebhooks')}</h2>
      <ol className='list-inside list-decimal space-y-2'>
        <li>{t('loginSentry')}</li>
        <li>{t('navigateSettings')}</li>
        <li>{t('clickIntegrations')}</li>
        <li>{t('findWebhooks')}</li>
        <li>{t('pasteURL')}</li>
      </ol>
      <div className='mt-4 flex items-center rounded bg-gray-100 p-4'>
        <input
          className='flex-1 bg-transparent text-sm outline-none'
          readOnly
          type='text'
          value={link}
        />
        <Button
          icon='copy'
          onClick={onCopy}
          className='ml-2'
          color='black'
          outline={true}>
          {t('copyLink')}
        </Button>
      </div>
      <div className='mt-4'>
        <p>{t('saveChanges')}</p>
      </div>
    </div>
  );
};

const ErrorList: FC<ErrorListProps> = ({ archived }) => {
  const { data,removeItem, isLoading, setQueryParams } = useGetPaginatedCollection<SentryError>('sentry_exceptions', {
    archived,
  });

  useEffect(() => {
    setQueryParams({ archived });
  }, [setQueryParams, archived]);

  return (
    <div className='flex flex-col gap-4'>
      {!data?.length && (
        <div className='p-4'>
          {isLoading && (<Skeleton />)}
          {!isLoading && !data.length && (<NoErrorFound />)}
        </div>
      )}
      {data.map((error) => (<ErrorCard
        onUpdate={removeItem}
        error={error}
        key={error.id}
      />))}
    </div>
  );
};

export default ErrorList;
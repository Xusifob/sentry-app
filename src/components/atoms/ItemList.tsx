import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GiCactus } from "react-icons/all";
import Button from "@/components/atoms/Button";
import Skeleton from "@/components/atoms/Skeleton";
import { useTranslation } from "react-i18next";
import P from "@/components/atoms/P";
import Input from "@/components/atoms/Input";
import cls from "classnames";
import Tabs, { Tab } from "@/components/molecules/Tabs";
import Loader from "@/components/atoms/Loader";
import H2 from "@/components/atoms/H2";
import { getIconByName, IconType } from "@/components/atoms/Icon";
import Entity from "@/schemas/entity";
import useViewport from "@/hooks/ui/useViewport";
import useBulkMode from "@/hooks/ui/useBulkMode";
import Checkbox from "@/components/atoms/Checkbox";


export type ItemListItem<TData = Entity> = {
    id: string,
    title: string,
    subtitle: string,
    important?: boolean,
    editLink?: string,
    clickLink: string,
    onDelete?: (item: ItemListItem<TData>) => void;
    onToggleImportant?: (item: ItemListItem<TData>, value: boolean) => void;
    onArchive?: (item: ItemListItem<TData>) => void;
    onDisarchive?: (item: ItemListItem<TData>) => void;
    data: TData
}

interface ItemListProps<TData> {
    items: ItemListItem<TData>[];
    onPaginate?: () => void;
    loading?: boolean;
    hasMoreData?: boolean;
    onSearch?: (value: string) => void;
    tabs?: Tab[];
    isLoading?: boolean,
    perPage?: number;
    noDataFoundTitle?: string;
    bulkActions?: string[];
    onBulkAction?: (action: string, selected: string[]) => Promise<boolean>;
    noDataFoundContent?: string;
    className?: string,
}

type SearchBarProps = {
    onSearch: (value: string) => void;
    searching?: boolean
}


const ListSkeleton: FC = () => {


  return (<div className='flex min-w-[250px] flex-1 flex-row gap-4 bg-white p-4 dark:bg-gray-700'>
    <div className='flex w-[80%] grow flex-col gap-2'>
      <Skeleton size='medium' />
      <Skeleton size='small' className='w-48' />
    </div>
    <div className='w-[50px]'>
      <Skeleton size='large' className='w-full' />
    </div>
  </div>);
};


const SearchBar: FC<SearchBarProps> = ({ searching, onSearch }) => {

  const { t } = useTranslation();

  const [stickyClass, setStickyClass] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | undefined>();

  const onSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      onSearch(event.target.value);
    }, 500);

    setSearchTimeout(timeout);
  };

  const headerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const scrollableElement = document.getElementById('main-content');
    scrollableElement?.addEventListener('scroll', onScroll);

    return () => {
      scrollableElement?.removeEventListener('scroll', onScroll);
    };
  }, []);

  const onScroll = (e: Event) => {
    const target = e.target as HTMLDivElement;
    setStickyClass(target.scrollTop > (headerRef?.current?.clientHeight ?? 50) ? 'sticky-header' : '');
  };


  return (<div ref={headerRef} className={cls(stickyClass, 'p-4 w-full sm:w-auto max-w-1/4')}>
    <Input name='search' autoComplete='off'
      fetching={searching}
      type='search' onChange={(e) => onSearchInput(e)}
      value={search}
      placeholder={t('search') as string} />
  </div>);


};

type EmptyCardProps = {
    title?: string;
    content?: string;
}

const EmptyCard: FC<EmptyCardProps> = ({ title, content }) => {

  const { t } = useTranslation('item_list');

  return (
    <div className='flex grow flex-col justify-around bg-white p-4 dark:bg-gray-700'>
      <div className='flex flex-col items-center gap-8 text-center'>
        <div className='flex flex-col items-center gap-2 text-center'>
          <H2>{title ? title : t('empty_card.title')}</H2>
          <P>{content ? content : t('empty_card.content')}</P>
        </div>
        <GiCactus className='text-3xl dark:fill-white' />
      </div>
    </div>);
};


const ItemList = <T extends object>
  ({
    onSearch,
    perPage = 10,
    className,
    hasMoreData,
    onPaginate,
    tabs,
    bulkActions,
    onBulkAction,
    isLoading,
    items,
    noDataFoundTitle,
    noDataFoundContent,
    loading = false,
  }: ItemListProps<T>): JSX.Element => {

  const { t } = useTranslation();

  const { isBulkMode, setIsBulkMode, selectItem, selectedItems } = useBulkMode();

  const { xs } = useViewport();

  const onScroll = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement;
    if ((target.scrollTop + target.clientHeight + 100) >= target.scrollHeight) {
      onPaginate && onPaginate();
    }
  }, [onPaginate]);

  useEffect(() => {
    const scrollableElement = document.getElementById('main-content');
    scrollableElement?.addEventListener('scroll', onScroll);

    return () => {
      scrollableElement?.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);


  const skeletons = [];
  if (items.length === 0 && loading) {
    for (let i = 0; i < perPage; i++) {
      skeletons.push(<ListSkeleton key={i} />);
    }
  }


  return (
    <div>
      <div className='flex flex-col items-baseline justify-between sm:flex-row-reverse'>
        <div className='flex w-full flex-row items-center pr-4 sm:w-auto sm:flex-row-reverse sm:pr-0'>
          {onSearch && (<SearchBar searching={isLoading} onSearch={onSearch} />)}
          {bulkActions &&
                        <Button
                          onClick={() => setIsBulkMode(prevState => !prevState)}
                          color='primary'
                          outline={true}
                          icon={isBulkMode ? "close" : "bulk_action"}>
                          {t(isBulkMode ? "actions.bulk.close" : "actions.bulk.bulk_action")}
                        </Button>}
        </div>
        {tabs?.length && (<Tabs className='grow !pt-0' tabs={tabs} />)}
      </div>
      {isBulkMode && !!selectedItems.length &&
                (<div className='absolute inset-x-0 bottom-14 flex gap-4 bg-white p-4 sm:relative sm:bottom-0 sm:m-4'>
                  {bulkActions?.map((action) =>
                    (<Button
                      key={action}
                      onClick={async () => {
                        if(!onBulkAction) {
                          return;
                        }

                        await onBulkAction(action, selectedItems);
                        setIsBulkMode(false);

                      }}
                      color='primary'
                      outline={true}
                      icon={action as IconType}
                    >{t(`actions.bulk.${action}`)}</Button>)
                  )}
                </div>)}

      <ul className={cls('flex flex-row flex-wrap gap-2 sm:gap-4 px-4', className)}>
        {skeletons}
        {!skeletons.length && items.length === 0 && <EmptyCard
          content={noDataFoundContent}
          title={noDataFoundTitle}
        />}
        {!skeletons.length && items.map((item) => {
          return (
            <li key={item.id}
              className={cls(
                item.important ? 'bg-warning-100 border-2 border-warning-500' : 'bg-white',
                'w-full min-w-[250px] flex-1 rounded-md border-gray-200',
                'p-4 dark:bg-gray-700 sm:w-auto')}>
              <div className='flex items-center justify-between space-x-4'>
                {!isBulkMode && (<Link to={item.clickLink} className='block w-full min-w-0'>
                  <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>
                    {item.title}
                  </p>
                  <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                    {item.subtitle}
                  </p>
                </Link>)}
                {isBulkMode && (<button
                  onClick={() => selectItem(item.id)}
                  className='flex w-full min-w-0 cursor-pointer flex-row items-center gap-4 text-left'>
                  {isBulkMode && (<Checkbox
                    readOnly={true}
                    checked={selectedItems.includes(item.id)}
                    name='bulk'
                  />)}
                  <span>
                    <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>
                      {item.title}
                    </p>
                    <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                      {item.subtitle}
                    </p>
                  </span>
                </button>)}
                {!isBulkMode && (<div
                  className='inline-flex items-center gap-1 text-base font-semibold text-gray-900 dark:text-white'>
                  {item.onToggleImportant && (
                    <Button
                      onClick={() => item.onToggleImportant && item.onToggleImportant(item, !item.important)}
                      color='transparent'>
                      {getIconByName(
                        item.important ? 'important' : 'unimportant',
                        { className: 'text-gray-800 dark:text-white' })}
                    </Button>)}
                  {item.editLink && (<Link to={item.editLink} color='transparent'>
                    {getIconByName('edit', { className: 'text-gray-800 dark:text-white' })}
                  </Link>)}
                  {item.onArchive && (
                    <Button onClick={() => item.onArchive && item.onArchive(item)}
                      color='transparent'>
                      {getIconByName('archive', { className: 'text-gray-800 dark:text-white' })}
                    </Button>)}
                  {item.onDisarchive && (
                    <Button onClick={() => item.onDisarchive && item.onDisarchive(item)}
                      color='transparent'>
                      {getIconByName('unarchive', { className: 'text-gray-800 dark:text-white' })}
                    </Button>)}

                  {item.onDelete && (
                    <Button onClick={() => item.onDelete && item.onDelete(item)}
                      color='transparent'>
                      {getIconByName('delete', { className: 'text-gray-800 dark:text-white' })}
                    </Button>)}
                </div>)}
              </div>
            </li>);
        })}
      </ul>

      {!xs && onPaginate && !loading && hasMoreData && (<div className='mt-4 flex justify-center'>
        <Button onClick={onPaginate}
          icon='sync'
          outline={true}
          color='primary'
        >
          {t('load_more')}
        </Button>
      </div>)}

      {(!skeletons.length && loading) && (
        <div className='fixed inset-x-0 bottom-[70px] flex w-full justify-center'>
          <div
            className='flex shrink flex-row items-center gap-4 rounded-md bg-gray-700 p-2'>
            <Loader className='text-white' />
            <P className='!mt-0 text-white'>{t('loading')}</P>
          </div>
        </div>)}
    </div>
  );
};

export default ItemList;
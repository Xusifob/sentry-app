import { QueryParams } from "@/utils/http";
import { useCallback, useEffect, useMemo, useState } from "react";
import useGetCollection from "@/hooks/base/useGetCollection";
import Collection from "@/schemas/Collection";
import Entity from "@/schemas/entity";

const useGetPaginatedCollection = <TItemType extends Entity = Entity>(path: string, initialQueryParams ?: QueryParams) => {

  const [data, setData] = useState<TItemType[]>([]);

  const [queryParams, setQueryParams] = useState<QueryParams>(initialQueryParams ?? {});

  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);


  const { data: backData, isLoading } = useGetCollection<Collection<TItemType>>(path, {
    page : Math.min(page, maxPage),
    ...queryParams
  });

  const removeItem = (item : TItemType) => {
    setData((prevState) => prevState.filter((value) => value.id !== item.id));
  };

  const { meta } = backData ?? { meta: undefined };

  useEffect(() => {

    if (!meta) {
      return;
    }

    if (!meta.totalItems || !meta.itemsPerPage) {
      return;
    }

    setMaxPage(Math.ceil(meta.totalItems / meta.itemsPerPage));
  }, [meta]);


  useEffect(() => {
    setData((prevState) => [
      ...prevState.filter((value) => !backData?.data.find((item : TItemType) => item.id === value.id))
      , ...backData?.data ?? []
    ]);

  }, [backData]);


  const setNewQueryParams = useCallback((newQueryParams: QueryParams) => {
    setQueryParams((prevState) => ({
      ...prevState,
      ...newQueryParams
    }));
    setPage(1);
    setData([]);
  }, []);


  const onPaginate = useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  const onDelete = useCallback((item: TItemType) => {
    setData((prevState) => prevState.filter((value) => value.id !== item.id));
  },[]);


  const onUpdate = useCallback((item: TItemType) => {

    setData((prevState) => {
      const index = prevState.findIndex((value) => value.id === item.id);
      if(index === -1){
        return prevState;
      }
      const newData = [...prevState];
      newData[index] = item;
      return newData;
    });

  },[]);

  const hasMoreData = useMemo(() => {
    return maxPage > page;
  }, [maxPage, page]);

  return {
    data,
    removeItem,
    isLoading,
    onDelete,
    onUpdate,
    currentPage: page,
    queryParams,
    maxPage,
    setQueryParams: setNewQueryParams,
    onPaginate,
    hasMoreData
  };

};

export default useGetPaginatedCollection;
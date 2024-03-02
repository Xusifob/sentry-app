import { useMutation } from "@tanstack/react-query";
import { GET, QueryParams, ResponseError } from "@/utils/http";
import Item from "@/schemas/Item";


type useGetMutateVariables = {
    id?: string,
    queryParams?: QueryParams
}

const useGetMutate = <TItem = Item | undefined>(path : string) => {

  const { mutateAsync, ...rest } = useMutation<TItem,ResponseError,useGetMutateVariables>({
    mutationKey: ['get', path],
    mutationFn: async ({ id, queryParams }: useGetMutateVariables) => {
      return GET<TItem>(id ? `${path}/${id}` : path, { queryParams });
    }
  });

  return {
    doGet: mutateAsync,
    ...rest
  };

};

export default useGetMutate;
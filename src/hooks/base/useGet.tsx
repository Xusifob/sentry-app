import { useQuery } from "@tanstack/react-query";
import { GET, QueryParams } from "@/utils/http";
import Item from "@/schemas/Item";


const useGet = <TItem = Item | undefined>(path: string, id :string | undefined = undefined, queryParams ?: QueryParams) => {

  return useQuery({
    queryKey: ['get', path, id, queryParams],
    queryFn: async () => GET<TItem>(`${path}/${id}`, { queryParams })
  });

};

export default useGet;
import { useQuery } from "@tanstack/react-query";
import { GET, QueryParams } from "@/utils/http";
import Collection from "@/schemas/Collection";

const useGetCollection = <TCollection = Collection>(path: string, queryParams ?: QueryParams) => {

  return useQuery({
    queryKey: [`get_collection`, path, queryParams],
    queryFn: async () => GET<TCollection>(path, { queryParams })
  });

};

export default useGetCollection;
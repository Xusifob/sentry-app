import { QueryParams } from "@/utils/http";
import useGet from "@/hooks/base/useGet";
import Item from "@/schemas/Item";
import { Me } from "@/schemas/User";

const useMe = (queryParams ?: QueryParams) => {
  return useGet<Item<Me>>('users', 'me', queryParams);
};

export default useMe;
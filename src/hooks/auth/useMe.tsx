import { QueryParams } from "@/utils/http";
import useGet from "@/hooks/base/useGet";
import Item from "@/schemas/Item";
import {User} from "@sentry/react";

const useMe = (queryParams ?: QueryParams) => {
  return useGet<Item<User>>('users', 'me', queryParams);
};

export default useMe;
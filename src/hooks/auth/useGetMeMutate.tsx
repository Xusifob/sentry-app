import Item from "@/schemas/Item";
import useGetMutate from "@/hooks/base/useGetMutate";
import { Me } from "@/schemas/User";


const useGetMeMutate = () => {
  const { doGet, ...rest } = useGetMutate<Item<Me>>('users');

  return {
    doGet: () => doGet({
      id: "me",
    }),
    ...rest
  };

};

export default useGetMeMutate;
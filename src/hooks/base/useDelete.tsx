import { useMutation } from "@tanstack/react-query";
import { DELETE } from "@/utils/http";


const useDelete = (path: string) => {
  const { mutateAsync, ...rest } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (id: string): Promise<null> => {
      await DELETE(`${path}/${id}`);
      return null;
    }
  });

  return {
    doDelete: mutateAsync,
    ...rest
  };

};

export default useDelete;
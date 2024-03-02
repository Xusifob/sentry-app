import { useMutation } from "@tanstack/react-query";
import { PATCH, POST, QueryParams, ResponseError } from "@/utils/http";
import { FieldValues } from "react-hook-form";
import { parseId } from "@/utils/utils";

type UpdateFieldValues = FieldValues & {
    id?: string
}

export type BackEntityType<T> = {
    data : {
        attributes : T
    }
}

type BuildBackEntityType<T> = (obj: T) => BackEntityType<T>;

export const buildBackEntity: BuildBackEntityType<unknown> = (obj) => {
  return {
    data: {
      attributes: obj
    }
  };
};

const useUpdate =
    <TRequestValues extends UpdateFieldValues, TResponseValue extends FieldValues = FieldValues>
  (path: string, queryParams ?: QueryParams) => {
      const { mutateAsync, ...rest } = useMutation<TResponseValue,ResponseError,TRequestValues>({
        mutationKey: [`update`, path, queryParams],
        mutationFn: async ({ id = undefined, ...rest }: TRequestValues): Promise<TResponseValue> => {

          const data = buildBackEntity(rest);

          return id ?
            PATCH<TResponseValue>(`${path}/${parseId(id)}`, data, { queryParams }) :
            POST<TResponseValue>(path, data, { queryParams });
        }

      });

      return {
        update: mutateAsync,
        ...rest
      };

    };

export default useUpdate;
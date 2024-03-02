import { UseFormSetError } from "react-hook-form/dist/types/form";
import { FieldValues } from "react-hook-form";
import { destroyTokens, getRefreshToken, LoginType, saveTokens } from "@/hooks/auth/useLogin";
import Collection from "@/schemas/Collection";
import Item from "@/schemas/Item";
import Entity from "@/schemas/entity";

const env = import.meta.env;

export type QueryParams = {
  [key: string]: string | number | boolean | undefined | QueryParams
}

const baseUrl = env.VITE_API_URL;
export const baseDomain = baseUrl.replace('/api/v1/','');

export type RequestOptionType = {
  queryParams?: QueryParams,
  json?: boolean,
  anonymous?: boolean,
  attachRelationships?: boolean,
  headers?: Headers
};

type FetchOptionType = RequestOptionType & {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
}

type BodyType = object | FormData | null;

type ErrorResponseBody = {
  message?: string
  errors: [
    {
      detail: string
      source: {
        pointer: string
      }
    }
  ]
}

export class ResponseError extends Error {

  response: Response;
  body: ErrorResponseBody | undefined;


  constructor(response: Response) {
    super();
    this.response = response;
  }

  async init() {
    this.body = await this.response.json();
  }

}

let refreshing: Promise<LoginType> | undefined;


const refresh = async () => {

  if (refreshing) {
    return refreshing;

  }

  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    localStorage.removeItem('token');
    throw new Error("No refresh token found");
  }
  try {

    const refreshHeaders = new Headers();
    refreshHeaders.append('Content-Type', 'application/json');

    refreshing = POST<LoginType>('token/refresh', {
      refreshToken: refreshToken
    }, {
      anonymous: true,
      headers: refreshHeaders
    });

    const result = await refreshing;
    refreshing = undefined;

    saveTokens(result);

    return;

  } catch (e) {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    throw e;

  }
};


export const POST = async <TValue>(url: string, data: BodyType, options: RequestOptionType = {}): Promise<TValue> => {
  return Fetch<TValue>(url, { ...options, ...{ method: 'POST' } }, data);
};

export const GET = async <TValue>(url: string, options: RequestOptionType = {}): Promise<TValue> => {

  return Fetch<TValue>(url, { ...options, ...{ method: 'GET' } });
};
export const DELETE = async (url: string, options: RequestOptionType = {}) => {
  return Fetch(url, { ...options, ...{ method: 'DELETE' } });
};

export const PATCH = async <TValue>(url: string, data: BodyType, options: RequestOptionType = {}) => {
  return Fetch<TValue>(url, { ...options, ...{ method: 'PATCH' } }, data);
};


const Fetch = async <TValue>(fetchUrl: string, {
  method,
  json = true,
  attachRelationships = true,
  anonymous = false,
  queryParams = undefined,
  headers = new Headers()
}: FetchOptionType, data: BodyType = null): Promise<TValue> => {

  const controller = new AbortController();
  const signal = controller.signal;

  let url = fetchUrl;

  let body: BodyInit | null = null;

  if (json) {
    if (!headers.has("Content-Type")) {
      headers.append("Content-Type", "application/vnd.api+json");
    }
    headers.append("Accept", "application/vnd.api+json");
    if (typeof data === "object" && method !== 'GET') {
      body = JSON.stringify(data);
    }
  }

  if (data instanceof FormData) {
    body = data;
  }

  const token = localStorage.getItem('token');

  if (token && !anonymous) {
    headers?.delete('Authorization');
    headers.append('Authorization', `Bearer ${token}`);
  }

  const requestInit: RequestInit = {
    method: method,
    headers: headers,
    signal
  };

  if (body) {
    requestInit.body = body;
  }

  if (queryParams) {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (typeof value === "undefined") {
        return;
      }

      if (typeof value === 'object') {
        Object.entries(value as object).forEach(([k, v]) => {
          if (!v) {
            return;
          }
          params.append(`${key}[${k}]`, v.toString());
        });
        return;
      }

      params.append(key, value.toString());
    });
    url += `?${params.toString()}`;
  }

  const timeout = setTimeout(() => {
    controller.abort();
  },120000);

  const response = await fetch(`${baseUrl}${url}`, requestInit);

  timeout && clearTimeout(timeout);

  if (response.status === 204) {
    return null as TValue;
  }

  if (response.status === 401) {
    if (getRefreshToken()) {
      try {
        await refresh();
      } catch (e) {
        destroyTokens();
        document.location.assign('/login');
        throw e;
      }

      return Fetch(fetchUrl, { method, json, anonymous, queryParams, attachRelationships, headers });
    } else {
      destroyTokens();
      document.location.assign('/login');
    }
  }

  if (!response.ok) {
    const error = new ResponseError(response);
    await error.init();
    throw error;
  }


  const jsonBody = await response.json();

  if (!attachRelationships) {
    return jsonBody;
  }

  return attachRelationshipsToObject(jsonBody) as TValue;

};


export const attachErrorsToFields = <TFieldValues extends FieldValues = FieldValues>
  (setError: UseFormSetError<TFieldValues>, responseError?: ResponseError | null) => {

  if (!responseError || !responseError.body) {
    return;
  }

  const errors = responseError.body.errors ?? [];

  errors.map((error) => {

    const key = error.source.pointer.replace('data/attributes/', '').replace('data/relationships/', '');

    setError(`root.${key}`, {
      type: 'server', message: error.detail
    });

  });

};


const attachRelationshipsToItem = (included: Entity[], entity: Entity): Entity => {

  if (typeof entity.relationships === "undefined") {
    return entity;
  }

  const relationship = entity.relationships;

  Object.keys(relationship).forEach((key) => {

    const obj = relationship[key].data;

    if (typeof obj === "undefined") {
      return;
    }

    // Handle collections
    if (Array.isArray(obj)) {
      obj.forEach((value, collectionIndex) => {

        const includedData = included?.find(object => value.id === object.id);

        if (includedData) {
          // @ts-ignore
          entity.relationships[key].data[collectionIndex] = includedData;
        }

      });

    } else {

      // Handle items
      const includedData = included?.find(object => obj.id === object.id);

      if (includedData) {
        // @ts-ignore
        entity.relationships[key].data = includedData;
      }
    }

  });

  return entity;

};

export const attachRelationshipsToObject = (data: Collection | Item): Collection | Item => {

  if (typeof data.included === "undefined") {
    return data;
  }

  const included: Entity[] = data.included;

  included.forEach((item, key) => {
    included[key] = attachRelationshipsToItem(included, item);
  });

  // Collections
  if (Array.isArray(data.data)) {
    data.data = data.data.map((entity) => attachRelationshipsToItem(included, entity));
  } else {
    // Items
    data.data = attachRelationshipsToItem(included, data.data);
  }

  return data;

};


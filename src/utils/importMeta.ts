const env = import.meta.env;

export const getEnv = (key: string): string => env?.[key] || '';

export const url = import.meta.url;

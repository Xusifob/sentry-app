export const buildId = (path: string, id: string): string => {
  return `/api/v1/${path}/${id}`;
};


export const readableTime = (seconds: number | undefined) => {

  if (typeof seconds === "undefined") {
    return undefined;
  }

  if(0 === seconds) {
    return "-";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - (hours * 3600)) / 60);
  const sec = seconds - (hours * 3600) - (minutes * 60);

  return `${hours}:${minutes}:${sec}`;
};


export const uniqid = (prefix = "", random = false): string => {
  const sec = Date.now() * 1000 + Math.random() * 1000;
  const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
  return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}` : ""}`;
};

export const parseId = (id: string): string => {
  const splitted = id.split("/");
  return splitted[splitted.length - 1];
};


export const formatDate = (date: Date | undefined | string, options: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric'
}): string => {

  if (typeof date === "undefined") {
    return "";
  }

  if (typeof date === "string") {
    date = new Date(date as string);
  }

  return date.toLocaleDateString(undefined, options);

};

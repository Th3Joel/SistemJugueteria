import { useStorage } from "./useStorage";

export const useFetch = async <T>(
  url: string,
  method: string,
  body?: object | FormData,
  isFormData?: boolean
): Promise<T> => {
  const uri = "http://192.168.1.60:7000/sisventa";

  const content_type = isFormData ? null : {
    "Content-Type": "application/json",
  }

  const req = await fetch(uri + url, {
    method,
    body: isFormData ? (body as FormData) : JSON.stringify(body),
    headers: {
       ...content_type,
      key: `${useStorage().get()}`,
    },
  });
  const res: T = await req.json();
  return res;
};

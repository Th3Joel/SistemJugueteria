
export const useFetch = async <T>(
  url: string,
  method: string,
  body?: object | FormData,
  isFormData?: boolean,
): Promise<T> => {
const uri = "http://localhost:5000/api"

  const content_type = isFormData ? null : {
    "Content-Type": "application/json",
  }

  const req = await fetch(uri + url, {
    method,
    body: isFormData ? (body as FormData) : JSON.stringify(body),
    credentials: "include",
    headers: {
      ...content_type
    },
  });

  const res: T = await req.json();


  return res;
};

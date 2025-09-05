import { query, form } from "$app/server";

export const foo = form(async (data) => {
  const text = data.get("text") as string;
  const key = data.get("key") as string;
  const api = data.get("api") as string;

  const response = await fetch("https://turgenev.ashmanov.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ text, key, api }),
  });

  const responseData = (await response.json()) as ResponseData;

  return responseData;
});

interface ResponseData {
  link: string;
}

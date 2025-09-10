import { form } from "$app/server";

export const foo = form(async (data) => {
  const text = data.get("text") as string;
  const key = data.get("key") as string;
  const api = data.get("api") as string;

  const response = await fetch("https://turgenev.ashmanov.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ text, key, api, more: "1" }),
  });
  const responseData = await response.json();

  return responseData as AnalysisResult;
});

export interface Param {
  value: string | number;
  name: string;
  score: number;
}

export interface Detail {
  params: Param[];
  link: string;
  block: string;
  sum: number;
}

export interface AnalysisResult {
  link: string;
  level: string | undefined;
  details: Detail[];
  risk: number | undefined;
  params: Param[];
}

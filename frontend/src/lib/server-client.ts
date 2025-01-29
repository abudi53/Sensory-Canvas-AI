import { cookies } from "next/headers";

export const serverClient = async (args: {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
}) => {
  console.log(args);
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const cookieStore = await cookies();

  return fetch(`${baseURL}${args.endpoint}`, {
    method: args.method,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
      Authorization: `Bearer ${cookieStore.get("access_token")?.value}`,
    },
    body: JSON.stringify(args.body),
    credentials: "include",
  });
};

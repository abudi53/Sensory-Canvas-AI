import { cookies } from "next/headers";

export const serverClient = async (args: {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
}) => {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_BACKEND_API_URL is not defined.");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  // Initialize headers with Content-Type and Cookie
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Cookie: cookieStore.toString(),
  };

  // Conditionally add Authorization header if accessToken exists
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // Prepare fetch options
  const fetchOptions: RequestInit = {
    method: args.method,
    headers,
    credentials: "include", // Ensure cookies are included
  };

  // Add body if present and method is not GET
  if (args.body && args.method !== "GET") {
    fetchOptions.body = JSON.stringify(args.body);
  }

  try {
    const response = await fetch(`${baseURL}${args.endpoint}`, fetchOptions);
    return response;
  } catch (error) {
    console.error(`Error fetching ${args.endpoint}:`, error);
    throw new Error(`Network error while accessing ${args.endpoint}`);
  }
};

import { cookies } from "next/headers";

export const serverClient = async (args: {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  contentType?: "application/json" | "application/x-www-form-urlencoded"; // Add contentType argument
}) => {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const effectiveContentType = args.contentType || "application/json"; // Default to JSON

  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_BACKEND_API_URL is not defined.");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  // Initialize headers with Content-Type and Cookie
  const headers: Record<string, string> = {
    "Content-Type": effectiveContentType, // Use the effective content type
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
    if (effectiveContentType === "application/x-www-form-urlencoded") {
      // Encode body as URL-encoded string
      fetchOptions.body = new URLSearchParams(
        args.body as Record<string, string>
      ).toString();
      console.log(`Fetching ${args.method} ${baseURL}${args.endpoint}, with form data:`, fetchOptions.body);
    } else {
      // Default to JSON encoding
      fetchOptions.body = JSON.stringify(args.body);
      console.log(`Fetching ${args.method} ${baseURL}${args.endpoint}, with JSON body:`, args.body);
    }
  } else {
      console.log(`Fetching ${args.method} ${baseURL}${args.endpoint} without body`);
  }


  try {
    // console.log(`Fetching ${args.method} ${baseURL}${args.endpoint}, with body:`, args.body); // Log moved above
    const response = await fetch(`${baseURL}${args.endpoint}`, fetchOptions);
    return response;
  } catch (error) {
    console.error(`Error fetching ${args.endpoint}:`, error);
    throw new Error(`Network error while accessing ${args.endpoint}`);
  }
};
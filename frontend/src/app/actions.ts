"use server";

import { encodedRedirect } from "@/utils/utils";
import { serverClient } from "@/lib/server-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData): Promise<void> {
  const response = await serverClient({
    endpoint: "auth/token",
    method: "POST",
    body: {
      username: formData.get("username") as string, // Ensure values are strings for URLSearchParams
      password: formData.get("password") as string,
    },
    contentType: "application/x-www-form-urlencoded", // Specify the content type
  });

  
  
  const data = await response.json();
  console.log(data);

  if (response.ok) {
    const cookieStore = await cookies();

    cookieStore.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // cookieStore.set("refresh_token", data.refresh, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   path: "/",
    //   sameSite: "lax",
    //   maxAge: 60 * 60 * 24 * 7,
    // });

    // Explicit return after setting cookies
    return redirect("/");
  }

  // Handle potential error response from the server if login fails
  let errorMessage = "Login failed";
  try {
    // Attempt to parse error details if the server sends JSON
    const errorData = await response.json();
    if (errorData && errorData.detail) {
        errorMessage = errorData.detail;
    }
  } catch (e) {
      // If parsing fails or no detail, use the default message
      console.error("Could not parse error response:", e);
  }


  return encodedRedirect("error", "/sign-in", errorMessage);
}

export async function registerAction(formData: FormData) {
  const username = formData.get("username")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const password2 = formData.get("password2")?.toString();

  // Validate required fields
  if (!username || !email || !password || !password2) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "All fields are required (username, email, password, password2)"
    );
  }

  // Basic client-side password match check (optional but good UX)
  if (password !== password2) {
    return encodedRedirect("error", "/sign-up", "Passwords do not match.");
  }

  try {
    // 1. Register the user
    const registerResponse = await serverClient({
      endpoint: "auth/",
      method: "POST",
      body: { username, email, password }, // Send only necessary fields for registration
    });

    if (!registerResponse.ok) {
      console.log("Registration error response:", registerResponse);
      let errorMessage = "Registration failed due to a server error."; // Default message

      try {
          const errorData = await registerResponse.json(); // Use a more flexible type like Record<string, any> or a specific interface
          console.log("Registration error data (JSON):", errorData);

          // Check if errorData exists and has a 'detail' property which is a string
          if (errorData && typeof errorData.detail === 'string') {
            errorMessage = errorData.detail; // Use the detail string directly
          } else {
             // Fallback if detail is missing, not a string, or errorData is null/undefined
             errorMessage = "Registration failed. Please try again.";
          }
      } catch (e) {
        // Catch errors during body parsing (JSON or text)
        console.error("Could not parse registration error response body:", e);
        errorMessage = `Registration failed (Status: ${registerResponse.status}). Could not read error details.`;
      }

      return encodedRedirect("error", "/sign-up", errorMessage);
    }

    // 2. Registration successful, now automatically log the user in
    const loginFormData = new FormData();
    loginFormData.append("username", username);
    loginFormData.append("password", password);

    await loginAction(loginFormData);

  } catch (error: unknown) {
    // Check if the error is a Next.js redirect (potentially from loginAction) and rethrow it
    if (error instanceof Error && error.message.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    // Handle specific error types during registration phase
    if (error instanceof Error) {
      console.error("Registration process error:", error);
      return encodedRedirect("error", "/sign-up", error.message);
    }

    // Handle generic errors during registration phase
    console.error("Unexpected registration error:", error);
    return encodedRedirect(
      "error",
      "/sign-up",
      "An unexpected error occurred during registration. Please try again."
    );
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.set("access_token", "", {
    maxAge: -1,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return redirect("/sign-in");
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    console.log("getCurrentUser: No access token found.");
    return null;
  }

  try {
    const response = await serverClient({
      endpoint: "users/me",
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("getCurrentUser: User data fetched successfully.");
      return data; // Return user data on success
    } else {
      // Handle non-OK responses (like 401 Unauthorized)
      console.error(`getCurrentUser: Failed with status ${response.status}`);
      return null;
    }
  } catch (error: unknown) {
    // Handle network errors or other exceptions during the fetch
    console.error("getCurrentUser error during fetch:", error);
    return null; 
  }
}

export async function generateArtAction(prompt: string) {
  // Encode the prompt and append it as a query parameter
  const endpointWithQuery = `image/generate?prompt=${encodeURIComponent(
    prompt
  )}`;

  const response = await serverClient({
    endpoint: endpointWithQuery, // Use the endpoint with the query string
    method: "GET",
    // Remove the body property for GET requests
  });

  if (!response.ok) {
    throw new Error(
      `Failed with status ${response.status}: ${await response.text()}`
    );
  }

  return response.json();
}

export async function saveArtAction(formData: FormData) {
  const response = await serverClient({
    endpoint: "image/save",
    method: "POST",
    body: {
      image_base64: formData.get("image_base64"),
      prompt: formData.get("prompt"),
    },
  });

  // Explicitly check if the response is not OK
  if (!response.ok) {
    if (response.status === 401) {
      redirect("/sign-in");
    }
    throw new Error(
      `Failed with status ${response.status}: ${await response.text()}`
    );
  }
}

export async function getSavedArtAction() {
  const response = await serverClient({
    endpoint: "image/me",
    method: "GET",
  });

  if (response.status === 401) {
    redirect("/sign-in");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch saved arts");
  }
  const data = await response.json();
  console.log("getSavedArtAction: Fetched saved arts:", data);
  return data; // Return the parsed JSON data

}

export async function deleteArtAction(id: number) {
  const response = await serverClient({
    endpoint: `/user-arts/${id}/delete/`,
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete art");
  }
}

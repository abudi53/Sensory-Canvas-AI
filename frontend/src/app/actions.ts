"use server";

import { encodedRedirect } from "@/utils/utils";
import { serverClient } from "@/lib/server-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData): Promise<void> {
  const response = await serverClient({
    endpoint: "/login/",
    method: "POST",
    body: {
      username: formData.get("username"),
      password: formData.get("password"),
    },
  });

  const data = await response.json();

  if (response.ok) {
    const cookieStore = await cookies();

    cookieStore.set("access_token", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    cookieStore.set("refresh_token", data.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    // Explicit return after setting cookies
    return redirect("/");
  }

  return encodedRedirect("error", "/sign-in", "Login failed");
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

  try {
    // 1. Register the user
    const registerResponse = await serverClient({
      endpoint: "/register/",
      method: "POST",
      body: { username, email, password, password2 },
    });

    if (!registerResponse.ok) {
      const errorData: Record<string, string[]> = await registerResponse.json();

      // Handle specific error messages, e.g., password mismatch
      if (errorData["password"] && errorData["password"][0]) {
        return encodedRedirect("error", "/sign-up", errorData["password"][0]);
      }

      // Fallback: show first available message or a default error
      const errorMessage =
        Object.values(errorData)[0]?.[0] || "Registration failed.";
      return encodedRedirect("error", "/sign-up", errorMessage);
    }

    // 2. Automatic login after successful registration
    const loginResponse = await serverClient({
      endpoint: "/login/",
      method: "POST",
      body: { username, password },
    });

    if (!loginResponse.ok) {
      // If login fails after successful registration
      return encodedRedirect(
        "success",
        "/sign-in", // Redirect to login page instead
        "Registration successful! Please log in."
      );
    }

    // 3. Set tokens and handle cookies
    const { access, refresh } = await loginResponse.json();
    const cookieStore = await cookies();

    cookieStore.set("access_token", access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    cookieStore.set("refresh_token", refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    // Direct return for successful flow
    return redirect("/");
  } catch (error: unknown) {
    // Check if the error is a Next.js redirect and rethrow it
    if (error instanceof Error && error.message.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    // Handle specific error types
    if (error instanceof Error) {
      return encodedRedirect("error", "/sign-up", error.message);
    }

    // Handle generic errors
    return encodedRedirect(
      "error",
      "/sign-up",
      "An unexpected error occurred. Please try again."
    );
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  // try {
  const refreshToken = cookieStore.get("refresh_token")?.value;

  // Only attempt server logout if refresh token exists
  if (refreshToken) {
    const response = await serverClient({
      endpoint: "/logout/",
      method: "POST",
      body: { refresh_token: refreshToken },
    });

    // Handle specific token expiration error (401 Unauthorized)
    if (response.status === 401) {
      console.log("Token already expired, proceeding with client-side cleanup");
    } else if (!response.ok) {
      console.error("Logout failed:", await response.text());
    }
  }

  // Always clear cookies regardless of token state
  cookieStore.set("access_token", "", {
    maxAge: -1,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  cookieStore.set("refresh_token", "", {
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
    return null;
  }

  try {
    const response = await serverClient({
      endpoint: "/user/",
      method: "GET",
    });

    if (response.ok) {
      return response.json();
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      // return encodedRedirect("error", "/sign-in", "error");
      console.error("getCurrentUser error:", error);
    }
  }
}

// export async function refreshTokensAction() {
//   const cookieStore = await cookies();
//   const refreshToken = cookieStore.get("refresh_token")?.value;

//   if (!refreshToken) {
//     return encodedRedirect("error", "/sign-in", "No refresh token found.");
//   }

//   try {
//     const response = await serverClient({
//       endpoint: "/token/refresh/",
//       method: "POST",
//       body: { refresh: refreshToken },
//     });

//     if (!response.ok) {
//       return encodedRedirect("error", "/sign-in", "Token refresh failed.");
//     } else {
//       return response;
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return encodedRedirect("error", "/sign-in", "refresh action");
//     }
//   }
// }

export async function generateArtAction(prompt: string) {
  const response = await serverClient({
    endpoint: "/generate-image/",
    method: "POST",
    body: { prompt },
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
    endpoint: "/user-arts/",
    method: "POST",
    body: {
      prompt: formData.get("prompt"),
      image_base64: formData.get("image_base64"),
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
    endpoint: "/user-arts/",
    method: "GET",
  });

  if (response.status === 401) {
    redirect("/sign-in");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch saved arts");
  }

  return response.json();
}
